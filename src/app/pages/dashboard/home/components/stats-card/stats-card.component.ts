import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProgressCircleComponent } from '../progress-circle/progress-circle.component';
import { WithLoaderDirective } from "@directive/withLoader.directive";
import { CreditService } from '@service';
import { SkeletonModule } from 'primeng/skeleton';


@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule, CardModule, ProgressCircleComponent, WithLoaderDirective, SkeletonModule],
  template: `
    <p-card class="transparent-bg">
      <div class="flex  items-center  justify-between">
        <!-- Stats Section -->
       <div class="flex flex-col md:flex-row w-full md:w-auto gap-5">

          <div *appWithLoader="totalCreditsPromise; loading: loadingSkeleton" class="bg-white/90 rounded-xl p-5">
              
              <div class="text-4xl font-bold text-blue-600 mb-2">{{verficationCounts().totalVerified}}</div>
              <div class="text-lg font-semibold text-gray-900 mb-4">Verified till now</div>

              <div class="flex items-center space-x-6">
                <div class="flex items-center space-x-2">
                  <i class="pi pi-thumbs-up text-green-500"></i>
                  <span class="text-green-500 font-medium">{{verficationCounts().valid}} Valid</span>
                </div>

                <div class="flex items-center space-x-2">
                  <i class="pi pi-thumbs-down text-red-500"></i>
                  <span class="text-red-500 font-medium">{{verficationCounts().invalid}} Invalid</span>
                </div>
                
              </div>
          </div>

            <!-- Progress Circle Section -->
            <app-progress-circle 
             *appWithLoader="creditHistory; loading: loadingSkeleton"
             [creditsUsage]="creditsUsage()"
              >
            </app-progress-circle>

          <ng-template  #loadingSkeleton>
            <div class="w-72 min-h-40 justify-self-stretch h-unset">
                <p-skeleton  class="w-full !h-full"></p-skeleton>
            </div>
          </ng-template>
       </div>

        <!-- Floating Icon -->
        <div class="hidden md:flex-shrink-0 md:mr-10">
          <div class="w-32 h-24 animate-float bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center transform rotate-12">
            <i class="pi pi-verified text-white text-4xl"></i>
          </div>
        </div>
      </div>
    </p-card>
  `
})
export class StatsCardComponent {

  private creditService = inject(CreditService)
  public verficationCounts = signal({
    valid: 0,
    invalid: 0,
    totalVerified: 0
  })
  public creditsUsage = signal({
    remainingCredits: 0,
    usedCredits: 0,
    usedPercentage: 0,
  })
  public totalCreditsPromise: Promise<void>
  public creditHistory: Promise<void>

  constructor() {

    this.totalCreditsPromise = this.creditService.getTotalCredits().then(({ data }) => {
      const totalCredits = data.getTotalCredits.total_credits;
      const remainingCredits = data.getTotalCredits.remaining_credits;
      const usedCredits = totalCredits - remainingCredits;
      const usedPercentage = totalCredits > 0 ? Number(((usedCredits / totalCredits) * 100).toFixed(2)) : 0;

      this.creditsUsage.set({
        remainingCredits: remainingCredits,
        usedCredits: usedCredits,
        usedPercentage: usedPercentage
      });

    })

    this.creditHistory = this.creditService.getCreditsHistory().then(
      ({ data }) => {
        this.verficationCounts.set({
          valid: data.creditsHistory.validCount,
          invalid: data.creditsHistory.invalidCount,
          totalVerified: data.creditsHistory.totalCount
        });
      })

  }


}
