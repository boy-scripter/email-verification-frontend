import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgxShineBorderComponent } from '@omnedia/ngx-shine-border';
import { HeadingComponent } from "@components/header.component";
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCheckCircle, heroEnvelope, heroServer, heroLockClosed, heroCog, heroStar } from '@ng-icons/heroicons/outline';
import { NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'app-features',
    standalone: true,
    imports: [NgxShineBorderComponent, HeadingComponent, NgIcon , NgTemplateOutlet],
    viewProviders: [provideIcons({ heroCheckCircle, heroEnvelope, heroServer, heroLockClosed, heroCog, heroStar })],
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
  `
})
export class FeaturesComponent {
    features = [
        { title: 'Syntax Check', description: 'We check email syntax using regular expressions to ensure no invalid characters.', icon: 'heroCheckCircle', color: '#22c55e' },
        { title: 'Mailbox Check', description: 'We simulate sending to verify mailbox exists and is active.', icon: 'heroEnvelope', color: '#facc15' },
        { title: 'Domain Check', description: 'We verify the domain via DNS records to ensure validity.', icon: 'heroServer', color: '#3b82f6' },
        { title: 'Security', description: 'Ensuring secure and safe email verification.', icon: 'heroLockClosed', color: '#ef4444' },
        { title: 'Configuration', description: 'Easily configure API and settings.', icon: 'heroCog', color: '#8b5cf6' },
        { title: 'Reliable', description: 'High uptime and consistent results.', icon: 'heroStar', color: '#f97316' },
    ];
}
