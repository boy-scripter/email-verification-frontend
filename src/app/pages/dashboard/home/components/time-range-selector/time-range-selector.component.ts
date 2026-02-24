import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { timeRangeOptionType } from '../verification-chart/chart.constant';

@Component({
  selector: 'app-time-range-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-wrap gap-2 mb-6">
      @for (period of periods(); track $index) {
        <button 
          (click)="onPeriodSelect(period)"
          [class]="getButtonClass(period)">
          {{period.label}}
        </button>
      }
    </div>
  `
})
export class TimeRangeSelectorComponent {
  periods = input<timeRangeOptionType[]>([]);
  periodChange = output<timeRangeOptionType>();
  selectedPeriod = input<timeRangeOptionType>();

  onPeriodSelect(period: timeRangeOptionType) {
    this.periodChange.emit(period);
  }

  getButtonClass(period: timeRangeOptionType): string {
    const baseClass = 'px-4 py-2 rounded-lg border text-sm font-medium transition-colors ';
    const activeClass = 'bg-blue-50 border-blue-200 text-blue-700';
    const inactiveClass = 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50';

    return baseClass + (this.selectedPeriod()?.label === period.label ? activeClass : inactiveClass);
  }
}