import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StatsCardComponent } from './components/stats-card/stats-card.component';
import { VerificationChartComponent } from './components/verification-chart/verification-chart.component';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, StatsCardComponent, VerificationChartComponent],
  template: `
    <div class="w-full">
      <div class="mb-8">
        <h1 class="text-3xl font-bold tracking-widest">Dashboard</h1>
      </div>
      <div class="flex flex-col gap-6">
        <!-- Stats Card Component -->
        <app-stats-card></app-stats-card>

        <!-- Verification Chart Component -->
        <app-verification-chart></app-verification-chart>
      </div>
    </div>
  `,
})
export class DashboardHomeComponent {}
