import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ButtonModule } from "primeng/button";


@Component({
  selector: 'app-progress-circle',
  standalone: true,
  imports: [CommonModule,ButtonModule],
  template: `
    <div class="shadow-sm bg-gradient-to-br p-5 px-8 rounded-lg from-blue-50 to-indigo-50">
      <div class="text-center">
        <div class="flex flex-col md:flex-row">
          <div class="relative w-32 h-32 mx-auto mb-4">
            <svg class="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" stroke="#e5e7eb" stroke-width="8" fill="none"></circle>
              <circle cx="60" cy="60" r="50" stroke="#3b82f6" stroke-width="8" fill="none" 
                [attr.stroke-dasharray]="circumference"
                [attr.stroke-dashoffset]="strokeDashoffset"
                stroke-linecap="round">
              </circle>
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-2xl font-bold text-blue-600">{{percentage()}}%</span>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Almost out of Credits,</h3>
            <h3 class="text-lg font-semibold text-blue-600 mb-4">Recharge Now!</h3>
            <div class="text-sm text-gray-600 mb-4 space-y-1">
              <div>Remaining Credits: <span class="text-green-600 font-medium">{{remainingCredits()}}</span></div>
              <div>Used Credits: <span class="font-medium">{{usedCredits()}}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProgressCircleComponent {
  percentage = input(0);
  remainingCredits = input(0);
  usedCredits = input(0);

  get circumference(): number {
    return 2 * Math.PI * 50; // r = 50
  }

  get strokeDashoffset(): number {
    return this.circumference - (this.percentage() / 100) * this.circumference;
  }
}