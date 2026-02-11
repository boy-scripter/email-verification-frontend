import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  FileInputComponent,
  FileInputDirective,
  FormComponent,
  InputComponent,
} from '@components/index';
import { AuthStore } from '@store/auth.store';
import { fileSizeValidator, fileTypeValidator } from '@util/error-handler';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

export interface ProfileForm {
  name: FormControl<string>;
  avatar: FormControl<string | null>;
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
  ],
  template: `
    <app-form
      [formGroup]="profileForm"
      (formSubmit)="onSubmit()"
      header="Profile"
      updateOn="change"
    >
      <app-file-input [fallBack]="authStore.authenticateUser().name[0]" fileType="AVTAR_IMAGE">
        <input [multiple]="false" appFileInput formControlName="avatar" type="file" />
      </app-file-input>
      <app-input icon="pi-user">
        <input formControlName="name" pInputText placeholder="Name" />  
      </app-input>
      <app-input icon="pi-envelope">
        <input [disabled]="true" pInputText placeholder="Email" readonly [value]="authStore.authenticateUser().email" />
      </app-input>
      <p-button #submitBtn fluid icon="pi pi-pencil" label="Save" type="submit"></p-button>
    </app-form>
  `,
})
export class ProfileComponent {
  authStore = inject(AuthStore);

  profileForm: FormGroup<ProfileForm>;

  constructor() {
    const user = this.authStore.authenticateUser();
    this.profileForm = new FormGroup(
      {
        name: new FormControl(user.name, { nonNullable: true, validators: [Validators.required] }),
        avatar: new FormControl('https://wallpapers.com/images/hd/link-hd-wallpaper-and-background-image-71mfep3ai8bib1mn.webp', {
          validators: [
            fileSizeValidator(0, 1024),
            fileTypeValidator(['png', 'jpeg', 'jpg', 'gif']),
          ],
        }),
      },
      { updateOn: 'change' },
    );
  }

  onSubmit() {
    //do job
  }
}
