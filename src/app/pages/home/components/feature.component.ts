import { Component } from '@angular/core';
import { NgxShineBorderComponent } from '@omnedia/ngx-shine-border';
import { HeadingComponent } from "@components/header.component";
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCheckCircle, heroEnvelope, heroServer, heroLockClosed, heroCog, heroStar } from '@ng-icons/heroicons/outline';
import { NgTemplateOutlet } from '@angular/common';

@Component({
    imports: [NgxShineBorderComponent, HeadingComponent, NgIcon , NgTemplateOutlet],
    selector: 'app-features',
    standalone: true,
    template: `
    <section class="py-20 bg-black-theme text-white px-6">
      <app-heading title="Key Features of Our Email Validation Service"></app-heading>

      <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

       @for(feature of features;track $index) {
            <ng-container *ngTemplateOutlet="featureTemplate; context: { $implicit: feature }">  </ng-container>
        }

      </div>

      <!-- Feature card template -->
      <ng-template #featureTemplate let-feature>
        <om-shine-border
          [gradientColorStart]="feature.color"
          [gradientColorMiddle]="feature.color"
          [gradientColorEnd]="feature.color"
          borderRadius="1rem"
          class="cursor-pointer hover:scale-105 transition-transform duration-300"
        >
          <div class="p-6 flex flex-col items-center text-center">
            <ng-icon [name]="feature.icon" size="28" [color]="feature.color" class="mb-4"></ng-icon>
            <h3 class="text-xl md:text-2xl font-semibold mb-4" [style.color]="feature.color">{{ feature.title }}</h3>
            <p class="text-gray-300 text-sm md:text-base">{{ feature.description }}</p>
          </div>
        </om-shine-border>
      </ng-template>
    </section>
  `,
    viewProviders: [provideIcons({ heroCheckCircle, heroCog, heroEnvelope, heroLockClosed, heroServer, heroStar })]
})
export class FeaturesComponent {
    features = [
        { color: '#22c55e', description: 'We check email syntax using regular expressions to ensure no invalid characters.', icon: 'heroCheckCircle', title: 'Syntax Check' },
        { color: '#facc15', description: 'We simulate sending to verify mailbox exists and is active.', icon: 'heroEnvelope', title: 'Mailbox Check' },
        { color: '#3b82f6', description: 'We verify the domain via DNS records to ensure validity.', icon: 'heroServer', title: 'Domain Check' },
        { color: '#ef4444', description: 'Ensuring secure and safe email verification.', icon: 'heroLockClosed', title: 'Security' },
        { color: '#8b5cf6', description: 'Easily configure API and settings.', icon: 'heroCog', title: 'Configuration' },
        { color: '#f97316', description: 'High uptime and consistent results.', icon: 'heroStar', title: 'Reliable' },
    ];
}