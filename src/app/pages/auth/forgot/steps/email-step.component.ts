import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormComponent, FormType, RawValue } from '@components/form.component';
import { InputComponent } from '@components/input.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

interface EmailForm {
    email: FormControl<string>;
}

export type EmailFormGroup = FormGroup<EmailForm>;


@Component({
    selector: 'app-email-step',
    imports: [ReactiveFormsModule, InputComponent, ButtonModule, InputTextModule, FormComponent, RouterLink],
    template: `
        <app-form header="Enter Email" (formSubmit)="onEmailSubmit($event)" [formGroup]="emailForm">
            <app-input icon="pi-user">
                <input pInputText placeholder="Enter your email" type="email" formControlName="email" />
            </app-input>
            <p-button #submitBtn type="submit" label="Send OTP" icon="pi pi-envelope" fluid></p-button>
            <p-button label="Back to Login" outlined fluid [routerLink]="['' , { outlets: { modal: ['auth' , 'login' ] } }]"></p-button>
        </app-form>
  `,
})
export class EmailStepComponent {
    onWorkDone = output<RawValue<EmailFormGroup>>();
    emailForm: EmailFormGroup

    constructor() {
        this.emailForm = new FormGroup<EmailForm>({
            email: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required, Validators.email]
            })
        });
    }

    async onEmailSubmit(data: FormType<EmailFormGroup>) {
        const { nextTask , ...formValue } = data
        nextTask()
        this.onWorkDone.emit(formValue)
    }
}
