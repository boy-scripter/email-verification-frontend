import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { ChartModule } from 'primeng/chart';
import { FormsModule } from '@angular/forms';
import { TimeRangeSelectorComponent } from '../time-range-selector/time-range-selector.component';

@Component({
  selector: 'app-verification-chart',
  standalone: true,
  imports: [CommonModule, CardModule, SelectModule, ChartModule, FormsModule, TimeRangeSelectorComponent],
  template: `
    <p-card class="shadow-sm">
      <div class="mb-6">
        <div class="flex flex-col items-start justify-between mb-4 space-y-3 sm:flex-row sm:items-center sm:space-y-0">
          <h2 class="text-lg sm:text-xl font-semibold text-surface-500">Verification Activity</h2>
          <p-select 
            [editable]="false"
            [options]="timeRangeOptions" 
            [(ngModel)]="selectedTimeRange" 
            placeholder="Please Select..."
            class="w-full sm:w-auto"
           >
          </p-select>
        </div>

        <!-- Time Range Selector Component -->
        <app-time-range-selector 
          [periods]="timePeriods"
          [selectedPeriod]="selectedPeriod"
          (periodChange)="onPeriodChange($event)">
        </app-time-range-selector>
      </div>

      <!-- Chart -->
      <div >
        <p-chart class="min-h-[300px] max-h-[300px] sm:min-h-[400px] sm:max-h-[400px] md:min-h-[500px] md:max-h-[500px]" type="line" [data]="chartData" [options]="chartOptions"></p-chart>
      </div>
    </p-card>
  `
})
export class VerificationChartComponent {
  selectedTimeRange: any;
  selectedPeriod: string = 'Last 24 Hours';

  timeRangeOptions = [
    { label: 'Last 24 Hours', value: '24h' },
    { label: 'Last 7 Days', value: '7d' },
    { label: 'Last 30 Days', value: '30d' },
    { label: 'Last 12 Months', value: '12m' }
  ];

  timePeriods = ['Last 24 Hours', 'Last 7 Days', 'Last 30 Days', 'Last 12 Months'];

  chartData = {
    labels: ['Feb 22nd', 'Feb 27th', 'Mar 4th', 'Mar 9th', 'Mar 14th'],
    datasets: [{
      data: [0.2, 0.6, 0.5, 0.8, 0.9],
      fill: true,
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      pointBackgroundColor: '#3b82f6',
      pointBorderColor: '#3b82f6',
      pointRadius: 4
    }]
  };

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6b7280'
        }
      },
      y: {
        min: 0,
        max: 1,
        ticks: {
          stepSize: 0.2,
          color: '#6b7280'
        },
        grid: {
          color: '#f3f4f6'
        }
      }
    },
    elements: {
      point: {
        hoverRadius: 6
      }
    }
  };

  onPeriodChange(period: string) {
    this.selectedPeriod = period;
    // Update chart data based on selected period
    this.updateChartData(period);
  }

  private updateChartData(period: string) {
    // Logic to update chart data based on selected period
    // This would typically call a service to fetch new data
  }
}