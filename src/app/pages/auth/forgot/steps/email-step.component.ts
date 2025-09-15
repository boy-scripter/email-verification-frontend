import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormComponent, RawValue } from '@components/form.component';
import { InputComponent } from '@components/input.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';


interface EmailForm {
    email: FormControl<string>;
}

export type EmailFormType = RawValue<FormGroup<EmailForm>>;

@Component({
    selector: 'app-email-step',
    imports: [ReactiveFormsModule, InputComponent, ButtonModule, InputTextModule, FormComponent, RouterLink],
    template: `
        <app-form header="Enter Email" [formSubmit]="onEmailSubmit" [formGroup]="emailForm">
            <app-input icon="pi-user">
                <input pInputText placeholder="Enter your email" type="email" formControlName="email" />
            </app-input>
            <p-button type="submit" label="Send OTP" icon="pi pi-envelope" fluid></p-button>
            <p-button label="Back to Login" outlined fluid [routerLink]="['' , { outlets: { modal: ['auth' , 'login' ] } }]"></p-button>
        </app-form>
  `,
})
export class EmailStepComponent {
    onWorkDone = output<EmailFormType>();
    emailForm: FormGroup<EmailForm>

    constructor() {
        this.emailForm = new FormGroup<EmailForm>({
            email: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required, Validators.email]
            })
        });
    }

    async onEmailSubmit(data: EmailFormType) {
        console.log('Sending OTP to:', data.email);
        // Here you would typically call an API to send the OTP
        this.onWorkDone.emit(data);
    }
}
