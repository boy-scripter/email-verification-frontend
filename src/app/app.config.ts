import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding, withHashLocation } from '@angular/router';
import { InMemoryCache, provideApollo, withApolloOptions } from '@apollo-orbit/angular';
import { HttpLinkFactory, withHttpLink } from '@apollo-orbit/angular/http';
import { enviroment } from '@env';
import { withViewTransitionsConfig } from '@provider/index';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { ModernRadixPreset } from './theme/present';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideApollo(
      withHttpLink(),
      withApolloOptions(() => ({
        cache: new InMemoryCache(),
        link: inject(HttpLinkFactory).create({ uri: enviroment.gql_base_url }),
      })),
    ),
    provideRouter(
      routes,
      withHashLocation(),
      withComponentInputBinding(),
      withViewTransitionsConfig(),
    ),
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
