import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import { ModernRadixPreset } from './theme/present';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    provideRouter(routes , withHashLocation()  ),
    provideAnimations(),
    providePrimeNG({
      theme: {
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'base ,primeng, theme ',
          },
        },
        preset: ModernRadixPreset,
      },
    }),
  ],
};
