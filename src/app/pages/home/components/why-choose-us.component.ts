import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCheck } from '@ng-icons/heroicons/outline';
import { HeadingComponent } from '@components/header.component';
import { NgxGridpatternComponent } from '@omnedia/ngx-gridpattern';

interface Feature {
  title: string;
  iconColor: string;
}

@Component({
  imports: [HeadingComponent, NgIcon, NgxGridpatternComponent],
  providers: [provideIcons({ heroCheck })],
  selector: 'app-why-choose-us',
  standalone: true,
  template: `
    <section class="relative md:px-20 bg-surface-500 py-14 px-6 overflow-hidden">
      
      <!-- Grid Background -->
      <om-gridpattern class="absolute inset-0 pointer-events-none"
        [gridColor]="'rgba(255, 255, 255, 0.1)'"
        [gradientColor]="'rgb(10,10,10)'"
        [smallGrid]="true"
      ></om-gridpattern>

      <!-- Content -->
      <div class="relative z-10">
        <app-heading title="Why Choose Us?" ></app-heading>

        <div class="flex flex-col-reverse md:flex-row items-center gap-10 mt-10 md:mt-16">
          
          <!-- Left Content -->
          <div class="md:basis-3/5 flex flex-col gap-6">
            <p class="text-theme-white text-lg md:text-xl leading-relaxed">
              Email validation is the process of verifying the accuracy and quality of email addresses to ensure they are valid and active. 
              It is an essential tool for businesses and marketers who rely on email marketing to reach their customers.
            </p>

            <p class="text-theme-white text-lg md:text-xl leading-relaxed">
              This can lead to higher engagement rates and better ROI for your email campaigns. In today's digital world, email validation is a critical component of any successful email marketing strategy.
            </p>

            <ul class="flex flex-col gap-4 mt-4">
              @for(feature of features;track $index) {
                <li class="flex items-center gap-3" >
                  <div class="p-2 rounded-full bg-white flex items-center justify-center">
                    <ng-icon name="heroCheck" size="24" [color]="feature.iconColor" strokeWidth="6"></ng-icon>
                  </div>
                  <span class="text-theme-white text-base md:text-lg">{{ feature.title }}</span>
                </li>
            }
            </ul>
          </div>

          <!-- Right Image -->
          <div class="md:basis-2/5 flex justify-center relative">
            <img src="/assets/images/why.webp" alt="Email Validation why" 
                 class="w-full max-w-md rounded-2xl shadow-lg object-cover animate-float" />
          </div>
        </div>
      </div>
    </section>
  `
})
export class WhyChooseUsComponent {
  features: Feature[] = [
    { iconColor: '#22c55e', title: 'Accurate & fast email validation' },
    { iconColor: '#facc15', title: 'Developer friendly & easy integration' },
    { iconColor: '#3b82f6', title: 'High ROI for email campaigns' },
    { iconColor: '#ec4899', title: 'Real-time verification' },
    { iconColor: '#14b8a6', title: 'Bulk email validation' },
    { iconColor: '#f97316', title: 'Secure & reliable' }
  ];
}
