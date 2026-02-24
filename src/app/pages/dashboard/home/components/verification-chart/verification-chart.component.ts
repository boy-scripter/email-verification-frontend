import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { ChartModule } from 'primeng/chart';
import { FormsModule } from '@angular/forms';
import { TimeRangeSelectorComponent } from '../time-range-selector/time-range-selector.component';
import { CHART_CONFIG , timeRangeOptionType } from './chart.constant';


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
            (onChange)="onPeriodChange($event.value)"
            placeholder="Please Select..."
            class="w-full sm:w-auto"
           >
          </p-select>
        </div>

        <!-- Time Range Selector Component -->
        <app-time-range-selector 
          [periods]="timeRangeOptions"
          [selectedPeriod]="selectedTimeRange()"
          (periodChange)="onPeriodChange($event)">
        </app-time-range-selector>
      </div>

      <!-- Chart -->
      <div class="chart" >
        <p-chart class="min-h-[300px] max-h-[300px] sm:min-h-[400px] sm:max-h-[400px] md:min-h-[500px] md:max-h-[500px]" type="line" [data]="chartData" [options]="chartOptions"></p-chart>
      </div>
    </p-card>
  `
})
export class VerificationChartComponent {
  
  //CONSTANTS
  public chartData = CHART_CONFIG.chartData;
  public chartOptions = CHART_CONFIG.chartOptions;
  public timeRangeOptions = CHART_CONFIG.timeRangeOptions;
  
  selectedTimeRange = signal(this.timeRangeOptions[0]);

  onPeriodChange(period: timeRangeOptionType) {
    this.selectedTimeRange.set(period);
    this.updateChartData(period.value());
  }

  private updateChartData(period: string) {
    console.log(period);
  }
}