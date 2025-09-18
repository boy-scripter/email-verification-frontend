import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { StatsCardComponent } from './components/stats-card/stats-card.component';
import { VerificationChartComponent } from './components/verification-chart/verification-chart.component';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, StatsCardComponent, VerificationChartComponent],
  template: `
  
      <div class="mb-8 ">
        <h1 class="text-3xl tracking-widest font-bold">Dashboard</h1>
      </div>
      <div class="flex flex-col gap-6">
      
          <!-- Stats Card Component -->
          <app-stats-card></app-stats-card>
          
          <!-- Verification Chart Component -->
          <app-verification-chart></app-verification-chart>
     
      </div>

  `,
})

export class DashboardHomeComponent { }