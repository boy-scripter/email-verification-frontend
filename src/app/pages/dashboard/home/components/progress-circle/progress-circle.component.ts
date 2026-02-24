import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ButtonModule } from "primeng/button";
import { CircleProgressComponent } from '@components/circle-progress.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-progress-circle',
  standalone: true,
  imports: [CommonModule,ButtonModule,CircleProgressComponent, RouterLink , ButtonModule],
  template: `
    <div class="shadow-sm bg-gradient-to-br p-5 px-8 rounded-lg from-blue-50 to-indigo-50">
      <div class="text-center">
        <div class="flex flex-col gap-5 md:flex-row">
          <div class="relative w-32 h-32 mx-auto mb-4">
         <app-circle-progress
            [value]="creditsUsage().usedPercentage"
            [size]="140"
            [strokeWidth]="10"
            [trackWidth]="6"
            [progressColor]="'#3b82f6'"
            [trackColor]="'#e5e7eb'"
            >
          </app-circle-progress>
            
          </div>
          <div>
           @if(creditsUsage().usedPercentage > 80 || creditsUsage().remainingCredits < 10){
             <h3 class="text-lg font-semibold text-gray-900 mb-2">Almost out of Credits</h3>
             <p-button [severity]="'success'" routerLink="/dashboard/buy-credits" styleClass=" mb-4">Recharge Now!</p-button>
           }
           @else{
             <h3 class="text-lg font-semibold text-gray-900 mb-2">You have enough Credits</h3>
             <h3 class="text-lg font-semibold text-blue-600 mb-4">Keep Verifying!</h3>
           }
           
            <div class="text-sm text-gray-600 mb-4 space-y-1">
              <div>Remaining Credits: <span class="text-green-600 font-medium">{{creditsUsage().remainingCredits}}</span></div>
              <div>Used Credits: <span class="font-medium">{{creditsUsage().usedCredits}}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProgressCircleComponent {

  
  public creditsUsage = input({
    remainingCredits: 0,
    usedCredits: 0,
    usedPercentage: 0,
  })

}