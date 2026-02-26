import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { ChartModule } from 'primeng/chart';
import { FormsModule  } from '@angular/forms';
import { CHART_CONFIG } from './chart.constant';
import { CreditsHistoryModel } from 'src/app/graphql/generated';
import { TimeRangeSelectorComponent } from '../time-range-selector/time-range-selector.component';
import { CreditService } from '@service';

export interface PeriodType {
  label: string;
  value: {
    gte: string;
    lte: string;
  };
}

@Component({
  selector: 'app-verification-chart',
  standalone: true,
  imports: [CommonModule, CardModule, SelectModule, ChartModule, FormsModule, TimeRangeSelectorComponent ,FormsModule ],
  template: `
    <p-card class="shadow-sm">
      <div class="mb-6">
        <div class="flex flex-col items-start justify-between mb-4 space-y-3 sm:flex-row sm:items-center sm:space-y-0">
          <h2 class="text-lg sm:text-xl font-semibold text-surface-500">Verification Activity</h2>
          <p-select 
            [editable]="false"
            optionLabel="name"
            [options]="timeRangeOptions" 
            [(ngModel)]="selectedTimeRange"
            (onChange)="onPeriodChange()"
            placeholder="Please Select ..."
            class="w-full sm:w-auto"
           >
          </p-select>
        </div>

        <!-- Time Range Selector Component -->
        <app-time-range-selector 
          [periods]="timeRangeOptions"
          [(ngModel)]="selectedTimeRange"
          (periodChange)="onPeriodChange()">
        </app-time-range-selector>
      </div>

      <!-- Chart -->
      <div class="chart" >
        <p-chart class="min-h-[300px] max-h-[300px] sm:min-h-[400px] sm:max-h-[400px] md:min-h-[500px] md:max-h-[500px]" type="line" [data]="chartData()" [options]="chartOptions"></p-chart>
      </div>
    </p-card>
  `
})
export class VerificationChartComponent {
  private creditService = inject(CreditService)
  
  //CONSTANTS
  public chartData = signal(CHART_CONFIG.chartData);
  public chartOptions = CHART_CONFIG.chartOptions;
  public timeRangeOptions = CHART_CONFIG.timeRangeOptions;
  
  selectedTimeRange = this.timeRangeOptions[0];

  onPeriodChange() {
    const { gte, lte } = this.selectedTimeRange.value()
    this.updateChartData(gte, lte);
  }

  private async updateChartData(gte: string, lte: string) {
    const { data } = await this.creditService.getCreditsHistoryRange(gte, lte)
    const chartData = this.responseToChart(data.creditsByRange)
    this.chartData.set(chartData)
  }

 private responseToChart(response : CreditsHistoryModel[]){
    const labels = response.map(item => {
      const date = new Date(item.date);
      return `${date.toLocaleDateString('en-US', { month: 'short' })} ${date.getDate()} ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}`;
    });

  return {
    labels: labels,
    datasets: [
      {
        label: 'Valid',
        data: response.map(x => x.validCount),
        fill: true,
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34,197,94,0.15)',
        tension: 0.4,
        pointBackgroundColor: '#22c55e',
        pointBorderColor: '#22c55e',
        pointRadius: 4
      },
      {
        label: 'Invalid',
        data: response.map(x => x.invalidCount),
        fill: true,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239,68,68,0.15)',
        tension: 0.4,
        pointBackgroundColor: '#ef4444',
        pointBorderColor: '#ef4444',
        pointRadius: 4
      },
      {
        label: 'Total',
        data: response.map(x => x.totalCount),
        fill: true,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.15)',
        tension: 0.4,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#3b82f6',
        pointRadius: 4
      }
    ]
  };
}
}