import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  FileInputComponent,
  FileInputDirective,
  FormComponent,
  FormType,
  InputComponent,
} from '@components/index';
import { AuthStore } from '@store/auth.store';
import { fileSizeValidator, fileTypeValidator } from '@util/error-handler';
import { UploadStoreService } from '@util/uploader/service/uploadstore.service';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

export interface ProfileForm {
  name: FormControl<string>;
  avatar: FormControl<File | null>;
}
@Component({
  selector: 'app-profile',
  imports: [
    FormComponent,
    InputComponent,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    FileInputComponent,
    FileInputDirective,
    AvatarModule,
  ],
  providers: [],
  template: `
    <app-form
      [formGroup]="profileForm"
      (formSubmit)="onSubmit($event)"
      header="Profile"
      updateOn="change"
    >
      <app-file-input mediaCode="AVTAR_IMAGE">
        <input [multiple]="false" appFileInput formControlName="avatar" type="file" />
        <ng-template #preview let-fileInfo>
          @let previewUrl = fileInfo && fileInfo?.preview();
          <!-- @let fileObj = fileInfo && fileInfo?.toFile(); -->
          @if (previewUrl) {
            <p-avatar class="mx-auto" [image]="previewUrl" shape="circle" size="xlarge" />
          } @else {
            <p-avatar
              class="mx-auto"
              [label]="authStore.authenticateUser().name[0]"
              shape="circle"
              size="xlarge"
            />
          }
        </ng-template>
      </app-file-input>
      <app-input icon="pi-user">
        <input formControlName="name" pInputText placeholder="Name" />
      </app-input>
      <app-input icon="pi-envelope">
        <input
          [disabled]="true"
          [value]="authStore.authenticateUser().email"
          pInputText
          placeholder="Email"
          readonly
        />
      </app-input>
      <p-button #submitBtn fluid icon="pi pi-pencil" label="Save" type="submit"></p-button>
    </app-form>
  `,
})
export class ProfileComponent {
  authStore = inject(AuthStore);
  uploadStore = inject(UploadStoreService);
  profileForm: FormGroup<ProfileForm>;

  constructor() {
    const user = this.authStore.authenticateUser();
    this.profileForm = new FormGroup(
      {
        name: new FormControl<string>(user.name, {
          nonNullable: true,
          validators: [Validators.required],
        }),
        avatar: new FormControl<File | null>(null, {
          validators: [
            fileSizeValidator(0, 1024),
            fileTypeValidator(['png', 'jpeg', 'jpg', 'gif']),
          ],
        }),
      },
      { updateOn: 'change' },
    );
  }

  async onSubmit(value: FormType<typeof this.profileForm>) {
    const { nextTask, name, avatar } = value;
    if (avatar) {
      const fileId = await this.uploadStore.startUpload('avatar');
      await this.authStore.updateProfileImage(fileId);
    } else {
      await this.authStore.updateProfile({ name });
    }
    nextTask();
  }
}
