import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding, withHashLocation } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { MessageService } from 'primeng/api';
import { routes } from './app.routes';
import { ModernRadixPreset } from './theme/present';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideRouter(routes, withHashLocation() , withComponentInputBinding()),
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
    MessageService,
  ],
};
