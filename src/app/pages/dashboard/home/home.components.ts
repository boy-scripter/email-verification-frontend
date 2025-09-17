import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { ChartModule } from 'primeng/chart';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-dashboard-home',
    standalone: true,
    imports: [CommonModule, CardModule, ButtonModule, SelectModule, ChartModule, FormsModule],
    template: `
    <div >
  
      <div class="mb-8">
        <h1 class="text-3xl font-bold ">Dashboard</h1>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div class="lg:col-span-2 space-y-6">
          
          <p-card class="shadow-sm backdrop-blur-xl bg-white/50">
            <div class="flex items-center  justify-between">
              <div class="bg-white rounded-xl p-5">
                <div class="text-4xl font-bold text-blue-600 mb-2">50</div>
                <div class="text-lg font-semibold text-gray-900 mb-4">Verified till now</div>
                <div class="flex items-center  space-x-6">
                  <div class="flex items-center space-x-2">
                    <i class="pi pi-thumbs-up text-green-500"></i>
                    <span class="text-green-500 font-medium">25 Valid</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <i class="pi pi-thumbs-down text-red-500"></i>
                    <span class="text-red-500 font-medium">25 Invalid</span>
                  </div>
                </div>
              </div>
              <div class="flex-shrink-0">
                <div class="w-32 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center transform rotate-12">
                  <i class="pi pi-verified text-white text-3xl"></i>
                </div>
              </div>
            </div>
          </p-card>

          <!-- Verification Activity Card -->
          <p-card class="shadow-sm">
            <div class="mb-6">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-semibold text-gray-900">Verification Activity</h2>
                <p-select 
                  [options]="timeRangeOptions" 
                  [(ngModel)]="selectedTimeRange" 
                  placeholder="Please Select..."
                  class="w-48">
                </p-select>
              </div>
              
              <!-- Time Range Buttons -->
              <div class="flex flex-wrap gap-2 mb-6">
                <button 
                  *ngFor="let period of timePeriods"
                  (click)="selectedPeriod = period"
                  [class]="'px-4 py-2 rounded-lg border text-sm font-medium transition-colors ' + 
                    (selectedPeriod === period ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50')">
                  {{period}}
                </button>
              </div>
            </div>
            
            <!-- Chart -->
            <div class="h-64">
              <p-chart type="line" [data]="chartData" [options]="chartOptions"></p-chart>
            </div>
          </p-card>
        </div>

        <!-- Right Column -->
        <div class="space-y-6">
          
          <!-- Credits Card -->
          <p-card class="shadow-sm bg-gradient-to-br from-blue-50 to-indigo-50">
            <div class="text-center">
              <!-- Circular Progress -->
              <div class="relative w-32 h-32 mx-auto mb-4">
                <svg class="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" stroke="#e5e7eb" stroke-width="8" fill="none"></circle>
                  <circle cx="60" cy="60" r="50" stroke="#3b82f6" stroke-width="8" fill="none" 
                    stroke-dasharray="314" stroke-dashoffset="78.5" stroke-linecap="round"></circle>
                </svg>
                <div class="absolute inset-0 flex items-center justify-center">
                  <span class="text-2xl font-bold text-blue-600">75%</span>
                </div>
              </div>
              
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Almost out of Credits,</h3>
              <h3 class="text-lg font-semibold text-blue-600 mb-4">Recharge Now!</h3>
              
              <div class="text-sm text-gray-600 mb-4 space-y-1">
                <div>Remaining Credits: <span class="text-green-600 font-medium">35</span></div>
                <div>Used Credits: <span class="font-medium">75</span></div>
              </div>
              
              <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                View Pricing
              </button>
            </div>
          </p-card>

          <!-- Pay As You Go Card -->
          <p-card class="shadow-sm">
            <div class="text-center">
              <div class="flex items-center justify-center mb-4">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                  <i class="pi pi-dollar text-2xl text-gray-600"></i>
                </div>
                <div class="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center transform rotate-12">
                  <i class="pi pi-credit-card text-2xl text-blue-600"></i>
                </div>
              </div>
              
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Save more money on</h3>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">our Pay - As - You - Go Plans</h3>
              
              <p class="text-sm text-gray-600 mb-6">
                We offer best in class Plans<br>
                For Every individual.
              </p>
              
              <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                View Pricing
              </button>
            </div>
          </p-card>
        </div>
      </div>
    </div>
    `,
})

export class DashboardHomeComponent {
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
        datasets: [
            {
                data: [0.2, 0.6, 0.5, 0.8, 0.9],
                fill: true,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                pointBackgroundColor: '#3b82f6',
                pointBorderColor: '#3b82f6',
                pointRadius: 4
            }
        ]
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
}