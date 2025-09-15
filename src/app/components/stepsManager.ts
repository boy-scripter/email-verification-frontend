import { ChangeDetectionStrategy, Component, ContentChildren, QueryList, AfterContentInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepComponent } from './step.component'; // base step component

@Component({
  selector: 'app-steps-manager',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngFor="let step of steps; let i = index">
      <ng-container *ngIf="currentStep() === i + 1">
        <ng-template [ngTemplateOutlet]="step.template"></ng-template>
      </ng-container>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepsManagerComponent implements AfterContentInit {
  currentStep = signal(1);

  @ContentChildren(StepComponent) steps!: QueryList<StepComponent>;

  ngAfterContentInit() {
    this.steps.forEach((step, index) => {
      step.nextStep.subscribe(() => this.goToStep(index + 2));
      step.prevStep.subscribe(() => this.goToStep(index));
    });
  }

  goToStep(stepNumber: number) {
    if (stepNumber < 1) stepNumber = 1;
    if (stepNumber > this.steps.length) stepNumber = this.steps.length;
    this.currentStep.set(stepNumber);
  }
}
