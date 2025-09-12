import { Component } from "@angular/core";
import { NgxNumberTickerComponent } from '@omnedia/ngx-number-ticker';
import { NgxGridpatternComponent } from '@omnedia/ngx-gridpattern';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCheck } from '@ng-icons/heroicons/outline';

interface TickerItem {
  prefix: string;
  countTo: number;
  suffix: string;
  color: string;
}

@Component({
  imports: [NgxNumberTickerComponent, NgxGridpatternComponent, NgIcon],
  providers: [provideIcons({ heroCheck })],
  selector: 'app-ticker',
  standalone: true,
  template: `
    <div class="relative w-full py-20 bg-surface-500 overflow-hidden">
      <om-gridpattern [gridColor]="'rgba(255,255,255,0.05)'" [gradientColor]="'rgba(0,0,0,0.3)'" [smallGrid]="true" class="absolute inset-0 pointer-events-none" ></om-gridpattern>
      <div class="relative z-10 flex flex-col md:flex-row flex-wrap items-center justify-center gap-6 md:gap-4 text-center md:text-left px-6">
          @for( ticker of tickers;track $index){
          <div class="contents md:flex flex-row  gap-6">
              <p class="text-2xl md:text-4xl font-bold text-white">{{ ticker.prefix }}</p>
              <om-number-ticker [countTo]="ticker.countTo" styleClass="text-4xl md:text-6xl font-extrabold" [style.color]="ticker.color"></om-number-ticker>
              <p class="text-2xl md:text-4xl font-bold text-white">{{ ticker.suffix }}</p>
              <ng-icon name="heroCheck" size="36" [color]="ticker.color" strokeWidth="8" class="ml-2 md:ml-4"></ng-icon>
          </div>
          }
      </div>
    </div>
  `
})
export class TickerComponent {
  tickers: TickerItem[] = [
    { color: '#22c55e', countTo: 50000, prefix: 'Over', suffix: 'emails verified!' },
    { color: '#3b82f6', countTo: 1200, prefix: 'More than', suffix: 'domains checked' },
    { color: '#facc15', countTo: 350, prefix: 'Trusted by', suffix: 'companies worldwide' }
  ];
}
