import { Component } from '@angular/core';
import { FormComponent, InputComponent } from '@components/index';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-profile',
  imports: [FormComponent, InputComponent, ButtonModule, InputTextModule],
  template: `
    <app-form header="Profile">
      <app-input icon="user">
        <input pInputText placeholder="Name" />
      </app-input>
      <p-button #submitBtn fluid icon="pi pi-pencil" label="Save" type="submit"></p-button>
    </app-form>
  `,
})
export class ProfileComponent {}
