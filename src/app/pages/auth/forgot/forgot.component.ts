import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { EmailFormType, EmailStepComponent } from './steps/email-step.component';
import { OtpFormType, OtpStepComponent } from './steps/otp-step.component';
import { PasswordStepComponent } from './steps/password-step.component';

@Component({
    imports: [EmailStepComponent, OtpStepComponent, PasswordStepComponent],
    selector: 'app-forgot-password',
    standalone: true,
    template: `
    <div>
        @if (currentStep() === 1) {
            <app-email-step (onWorkDone)="onEmailSubmitted($event)"></app-email-step>
        }

        @if (currentStep() === 2) {
            <app-otp-step  (onWorkDone)="onOtpVerified($event)" (backRequested)="goToStep(1)" [email]="submittedEmail()"   ></app-otp-step>
        }

        @if (currentStep() === 3) {
            <app-password-step (onWorkDone)="onPasswordReset($event)" (backRequested)="goToStep(2)" ></app-password-step>
        }
    </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent {
    currentStep = signal(1);
    submittedEmail = signal('');

    onEmailSubmitted(data: EmailFormType) {
        this.submittedEmail.set(data.email);
        this.currentStep.set(2);
    }

    onOtpVerified(otp: OtpFormType) {
        console.log('OTP verified:', otp);
        this.currentStep.set(3);
    }

    onPasswordReset(passwordData: { password: string; confirmPassword: string }) {
        console.log('Password reset completed:', passwordData);

    }

    goToStep(step: number) {
        this.currentStep.set(step);
    }
}
