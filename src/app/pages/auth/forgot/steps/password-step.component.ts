import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { FormComponent, FormType, RawValue } from '@components/form.component';
import { InputComponent } from '@components/input.component';
import { PasswordMatch } from '@util/validator';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

interface PasswordForm {
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
}
export type PasswordFormGroup = FormGroup<PasswordForm>;


@Component({
    selector: 'app-password-step',
    imports: [InputComponent, ButtonModule, InputTextModule, FormComponent , PasswordModule , ReactiveFormsModule , PasswordModule],
    template: `
        <app-form header="Create New Password" (formSubmit)="onPasswordSubmit($event)" [formGroup]="passwordForm">
            <p class=" text-sm mb-4">    Set a new password  </p>
            <app-input icon="pi-lock">
                <p-password [toggleMask]="true" [feedback]="false"  placeholder="Enter new password" type="password" formControlName="password" />
            </app-input>
            <app-input icon="pi-lock" [errorConfig]="{ mismatch : 'Confirm Password Is Not matching' }">
                <p-password [toggleMask]="true" [feedback]="false"  placeholder="Confirm new password" type="password" formControlName="confirmPassword" />
            </app-input>
            <p-button fluid label="Reset Password" #submitBtn type="submit" icon="pi pi-check" class="flex-1" > </p-button>
        </app-form>
    `,
})
export class PasswordStepComponent {
    // Outputs
    onWorkDone = output<RawValue<PasswordFormGroup>>();
    backRequested = output<void>();

    passwordForm: PasswordFormGroup;

    constructor() {
        this.passwordForm = new FormGroup<PasswordForm>({
            password: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required, Validators.minLength(6)]
            }),
            confirmPassword: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required, Validators.minLength(6) , PasswordMatch('password')]
            })
        });
    }

    async onPasswordSubmit(data: FormType<PasswordFormGroup>) {
        console.log('Password reset completed:', data);
        // Here you would typically call your API to reset the password
        this.onWorkDone.emit(data);
    }

    onBack() {
        this.backRequested.emit();
    }
}