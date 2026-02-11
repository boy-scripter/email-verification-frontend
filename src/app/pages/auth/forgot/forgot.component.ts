import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RawValue } from '@components/form.component';
import { StepperModule } from 'primeng/stepper';
import { EmailFormGroup, EmailStepComponent, OtpStepComponent, PasswordFormGroup, PasswordStepComponent } from './steps';

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
                        <app-password-step (workDone)="onPasswordReset($event)" (backRequested)="goToStep(2)" [token]="resetToken()"></app-password-step>
                    </ng-template>
                </p-step-panel>
            </p-step-panels>
        </p-stepper>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent {
    
    private readonly router = inject(Router);
    
    //states to prop drill (ha ha)
    currentStep = signal<StepsType>(1);
    submittedEmail = signal('');
    resetToken = signal('');

    onEmailSubmitted(data: RawValue<EmailFormGroup>) {
        const { email  } = data
        this.submittedEmail.set(email);
        this.currentStep.set(2);
    }

    onOtpVerified(data: { reset_token: string }) {
        this.resetToken.set(data.reset_token);
        this.currentStep.set(3);
    }

    onPasswordReset(passwordData: RawValue<PasswordFormGroup>) {
        console.log('Password reset completed:', passwordData);
        this.router.navigate([
            '',
            { outlets: { modal: ['modal', 'auth', 'login'] } }
            ]);

    }

    goToStep(step: StepsType) {
        this.currentStep.set(step);
    }
}
