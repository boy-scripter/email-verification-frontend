import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  FileInputDirective,
  FormComponent,
  ImageInputComponent,
  InputComponent,
} from '@components/index';
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
    ImageInputComponent,
    FileInputDirective,
  ],
  template: `
    <app-form [formGroup]="profileForm" (formSubmit)="onSubmit()" header="Profile">
      <app-image-input >
        <input appFileInput fileType="AVTAR_IMAGE" [multiple]="false" formControlName="avatar" type="file" value="test" />
      </app-image-input>
      <app-input icon="pi-user">
        <input formControlName="name" pInputText placeholder="Name" />
      </app-input>
      <app-input icon="pi-envelope">
        <input [disabled]="true" pInputText placeholder="Email" readonly value="test@gmail.com" />
      </app-input>
      <p-button #submitBtn fluid icon="pi pi-pencil" label="Save" type="submit"></p-button>
    </app-form>
  `,
})
export class ProfileComponent {
  profileForm: FormGroup<ProfileForm>;

  constructor() {
    this.profileForm = new FormGroup({
      name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      avatar: new FormControl('', { validators: [ fileSizeValidator(0, 1024), fileTypeValidator(['image/png', 'image/jpeg', 'image/gif'])] }),
    });
  }

  onSubmit() {
    //do job
  }
}
