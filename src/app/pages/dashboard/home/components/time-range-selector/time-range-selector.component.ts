import { Component, input, forwardRef, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { timeRangeOptionType } from '../verification-chart/chart.constant';

@Component({
  selector: 'app-time-range-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-wrap gap-2 mb-6">
      @for (period of periods(); track $index) {
        <button 
          type="button"
          (click)="onPeriodSelect(period)"
          [class]="getButtonClass(period)">
          {{ period.name }}
        </button>
      }
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimeRangeSelectorComponent),
      multi: true
    }
  ]
})
export class TimeRangeSelectorComponent implements ControlValueAccessor {

  public periodChange = output<timeRangeOptionType>( );

  // signal input
  periods = input<timeRangeOptionType[]>([]);

  // internal value
  private _value: timeRangeOptionType | null = null;

  // control value accessor callbacks
  private whenValueChange = (_value: any) => {
    // notify Angular forms
  };
  private whenTouched = () => {
    // notify Angular forms
  };

  // called when user clicks
  onPeriodSelect(period: timeRangeOptionType) {
    this._value = period;
    this.whenValueChange(period);  
    this.periodChange.emit(period);
    this.whenTouched();
  }

  // Angular writes value here
  writeValue(value: timeRangeOptionType): void {
    this._value = value;
  }

  registerOnChange(fn: any): void {
    this.whenValueChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.whenTouched = fn;
  }

  setDisabledState?(_isDisabled: boolean): void {
    // optionally handle disabled state
  }

  getButtonClass(period: timeRangeOptionType): string {
    const baseClass = 'px-4 cursor-pointer py-2 rounded-lg border text-sm font-medium transition-colors ';
    const activeClass = 'bg-blue-50 border-blue-200 text-blue-700';
    const inactiveClass = 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50';

    return baseClass + (this._value?.name === period.name ? activeClass : inactiveClass);
  }

}