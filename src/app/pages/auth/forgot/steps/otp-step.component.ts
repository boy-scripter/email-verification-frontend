import { Component, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent, FormType, RawValue } from '@components/form.component';
import { InputComponent } from '@components/input.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputOtpModule } from 'primeng/inputotp';
import { CountdownManager } from '@util/service/countdown.service';

interface OtpForm {
    otp: FormControl<string>;
}
export type OtpFormGroup = FormGroup<OtpForm>

@Component({
    selector: 'app-otp-step',
    imports: [ReactiveFormsModule, InputComponent, ButtonModule, InputTextModule, FormComponent, InputOtpModule],
    providers: [CountdownManager],
    template: `
        <app-form header="Verify OTP" (formSubmit)="onOtpSubmit($event)"  [formGroup]="otpForm">
            <p class="text-sm mb-4"> We've sent a 6-digit code to <strong>{{ email() }}</strong> </p>
            <app-input [errorConfig]="{'pattern':'OTP is Incorrect'}" class="max-w-80 mx-auto" >
                <p-inputOtp formControlName="otp" [length]="6"  class="text-center"></p-inputOtp>
            </app-input>
            <p-button fluid type="button" [disabled]="countDownService.isRunning"  (click)="resendOtp()" icon="pi pi-refresh">
               <span> Resend Code ? {{countDownService.timeLeft()}} </span>   
            </p-button>
            <p-button fluid type="submit" severity="success" label="Verify Code" #submitBtn icon="pi pi-check" ></p-button>
            <p-button fluid type="button" label="Entered a Wrong Email ?" (onClick)="backRequested.emit()" variant="text" ></p-button>
        </app-form>
    `,
})
export class OtpStepComponent {
    // Inputs
    email = input.required<string>();

    // Outputs
    onWorkDone = output<RawValue<OtpFormGroup>>();
    backRequested = output<void>();

    otpForm: OtpFormGroup;

    countDownService = inject(CountdownManager)

    constructor() {
        this.otpForm = new FormGroup<OtpForm>({
            otp: new FormControl('', {
                nonNullable: true,
                validators: [Validators.pattern(/^\d{6}$/)]
            })
        });
        this.countDownService.start(100)
    }

    async onOtpSubmit(data: FormType<OtpFormGroup>) {
        console.log('OTP submitted:', data);
        this.onWorkDone.emit(data);
    }

    onBack() {
        this.backRequested.emit();
    }

    async resendOtp() {
        console.log(this.otpForm)
        console.log('Resending OTP to:', this.email());

    }
}