import { Component, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent, RawValue } from '@components/form.component';
import { InputComponent } from '@components/input.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

interface OtpForm {
    otp: FormControl<string>;
}
export type OtpFormType = RawValue<FormGroup<OtpForm>>;

@Component({
    selector: 'app-otp-step',
    imports: [ReactiveFormsModule, InputComponent, ButtonModule, InputTextModule, FormComponent],
    template: `
        <app-form header="Enter OTP" [formSubmit]="onOtpSubmit" [formGroup]="otpForm">
            <p class="text-gray-600 text-sm mb-4">
                We've sent a 6-digit code to <strong>{{ email() }}</strong>
            </p>
            
            <app-input icon="pi-key">
                <input   pInputText   placeholder="Enter 6-digit code"   type="text"   formControlName="otp"  maxlength="6"  class="text-center text-lg tracking-widest" />
            </app-input>
            
            <p-button type="submit" label="Verify Code" icon="pi pi-check" fluid></p-button>
            
            <div class="flex gap-2">
                <p-button label="Back" outlined severity="secondary"  (click)="onBack()"  class="flex-1"> </p-button>
                <p-button label="Resend Code" outlined (click)="resendOtp()"  class="flex-1">  </p-button>
            </div>
        </app-form>
    `,
})
export class OtpStepComponent {
    // Inputs
    email = input.required<string>();
    
    // Outputs
    onWorkDone = output<OtpFormType>();
    backRequested = output<void>();

    otpForm: FormGroup<OtpForm>;

    constructor() {
        this.otpForm = new FormGroup<OtpForm>({
            otp: new FormControl('', {
                nonNullable: true,
                validators: [Validators.required, Validators.pattern(/^\d{6}$/)]
            })
        });
    }

    async onOtpSubmit(data: RawValue<typeof this.otpForm>) {
        console.log('OTP submitted:', data);
        this.onWorkDone.emit(data);
    }

    onBack() {
        this.backRequested.emit();
    }

    async resendOtp() {
        console.log('Resending OTP to:', this.email());
     
    }
}