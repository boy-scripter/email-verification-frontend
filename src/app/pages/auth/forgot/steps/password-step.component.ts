import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { FormComponent, RawValue } from '@components/form.component';
import { InputComponent } from '@components/input.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

interface PasswordForm {
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
}


function passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
        return { passwordMismatch: true };
    }
    return null;
}

@Component({
    selector: 'app-password-step',
    imports: [ReactiveFormsModule, InputComponent, ButtonModule, InputTextModule, FormComponent],
    template: `
        <app-form header="Create New Password" [formSubmit]="onPasswordSubmit" [formGroup]="passwordForm">
            <p class="text-gray-600 text-sm mb-4">    Set a new password  </p>

            <app-input icon="pi-lock">
                <input pInputText placeholder="Enter new password" type="password" formControlName="password" />
            </app-input>

            <app-input icon="pi-lock">
                <input pInputText placeholder="Confirm new password" type="password" formControlName="confirmPassword" />
            </app-input>

            <div class="flex gap-3 mt-6">
                <p-button label="Back"  severity="secondary" (click)="onBack()" class="flex-1" outlined  > </p-button>
                <p-button  label="Reset Password" #submitBtn type="submit" icon="pi pi-check" class="flex-1"> </p-button>
            </div>

        </app-form>
    `,
})
export class PasswordStepComponent {
    // Outputs
    onWorkDone = output<{ password: string; confirmPassword: string }>();
    backRequested = output<void>();

    passwordForm: FormGroup<PasswordForm>;

    constructor() {
        this.passwordForm = new FormGroup<PasswordForm>({
            password: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required, Validators.minLength(6)]
            }),
            confirmPassword: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required, Validators.minLength(6)]
            })
        }, { validators: passwordMatchValidator });
    }

    async onPasswordSubmit(data: RawValue<typeof this.passwordForm>) {
        console.log('Password reset completed:', data);
        // Here you would typically call your API to reset the password
        this.onWorkDone.emit(data);
    }

    onBack() {
        this.backRequested.emit();
    }
}