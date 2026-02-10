import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { StepperModule } from 'primeng/stepper';
import { RawValue } from '@components/form.component';
import { EmailStepComponent, EmailFormGroup, OtpFormGroup, OtpStepComponent, PasswordStepComponent, PasswordFormGroup } from './steps';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';

export type StepsType = 1 | 2 | 3;
@Component({
    imports: [EmailStepComponent, OtpStepComponent, PasswordStepComponent, StepperModule],
    selector: 'app-forgot-password',
    standalone: true,
    template: `
        <p-stepper [value]="currentStep()">
            <p-step-panels>
                <p-step-panel [value]="1" >
                    <ng-template pTemplate="content">
                        <app-email-step (workDone)="onEmailSubmitted($event)"></app-email-step>
                    </ng-template>
                </p-step-panel>

                <p-step-panel [value]="2" >
                    <ng-template pTemplate="content">
                        <app-otp-step (workDone)="onOtpVerified($event)" (backRequested)="goToStep(1)" [email]="submittedEmail()"></app-otp-step>
                    </ng-template>
                </p-step-panel>

                <p-step-panel [value]="3">
                    <ng-template pTemplate="content">
                        <app-password-step (workDone)="onPasswordReset($event)" (backRequested)="goToStep(2)"></app-password-step>
                    </ng-template>
                </p-step-panel>
            </p-step-panels>
        </p-stepper>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent {
    
    private readonly forgotPasswordService = inject(ForgotPasswordService);
    
    currentStep = signal<StepsType>(1);
    submittedEmail = signal('');


    onEmailSubmitted(data: RawValue<EmailFormGroup>) {
        const { email  } = data
        this.submittedEmail.set(email);
        this.currentStep.set(2);
    }

    onOtpVerified(otp: RawValue<OtpFormGroup>) {
        console.log('OTP verified:', otp);
        this.currentStep.set(3);
    }

    onPasswordReset(passwordData: RawValue<PasswordFormGroup>) {
        console.log('Password reset completed:', passwordData);
    }

    goToStep(step: StepsType) {
        this.currentStep.set(step);
    }
}
