import { provideRouter, withComponentInputBinding } from '@angular/router';
import { withViewTransitionsConfig } from '@provider/transition';
import { routes } from '../app.routes';

export const provideRoutingConfig = () => {
  return provideRouter(
    routes,
    
    // withHashLocation(),
    withComponentInputBinding(),
    withViewTransitionsConfig(),
  );
};
