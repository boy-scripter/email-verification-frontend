import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProgressCircleComponent } from '../progress-circle/progress-circle.component';


@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule, CardModule, ProgressCircleComponent],
  template: `
    <p-card class="shadow-sm backdrop-blur-xl bg-white/10">
      <div class="flex items-center justify-between">
        <!-- Stats Section -->
       <div class="flex gap-5">
          <div class="bg-white/90 rounded-xl p-5">
              <div class="text-4xl font-bold text-blue-600 mb-2">{{totalVerified}}</div>
              <div class="text-lg font-semibold text-gray-900 mb-4">Verified till now</div>
              <div class="flex items-center space-x-6">
                <div class="flex items-center space-x-2">
                  <i class="pi pi-thumbs-up text-green-500"></i>
                  <span class="text-green-500 font-medium">{{validCount}} Valid</span>
                </div>
                <div class="flex items-center space-x-2">
                  <i class="pi pi-thumbs-down text-red-500"></i>
                  <span class="text-red-500 font-medium">{{invalidCount}} Invalid</span>
                </div>
              </div>
            </div>

            <!-- Progress Circle Section -->
            <app-progress-circle 
              [percentage]="creditUsagePercentage"
              [remainingCredits]="remainingCredits"
              [usedCredits]="usedCredits">
            </app-progress-circle>
       </div>

        <!-- Floating Icon -->
        <div class="flex-shrink-0 md:mr-10">
          <div class="w-32 h-24 animate-float bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center transform rotate-12">
            <i class="pi pi-verified text-white text-4xl"></i>
          </div>
        </div>
      </div>
    </p-card>
  `
})
export class StatsCardComponent {
  totalVerified = 50;
  validCount = 25;
  invalidCount = 25;
  creditUsagePercentage = 75;
  remainingCredits = 35;
  usedCredits = 75;
}