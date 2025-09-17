import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-time-range-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-wrap gap-2 mb-6">
      <button 
        *ngFor="let period of periods"
        (click)="onPeriodSelect(period)"
        [class]="getButtonClass(period)">
        {{period}}
      </button>
    </div>
  `
})
export class TimeRangeSelectorComponent {
  @Input() periods: string[] = [];
  @Input() selectedPeriod: string = '';
  @Output() periodChange = new EventEmitter<string>();

  onPeriodSelect(period: string) {
    this.periodChange.emit(period);
  }

  getButtonClass(period: string): string {
    const baseClass = 'px-4 py-2 rounded-lg border text-sm font-medium transition-colors ';
    const activeClass = 'bg-blue-50 border-blue-200 text-blue-700';
    const inactiveClass = 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50';
    
    return baseClass + (this.selectedPeriod === period ? activeClass : inactiveClass);
  }
}