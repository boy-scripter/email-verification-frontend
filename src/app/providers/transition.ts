import { inject } from '@angular/core';
import { Router, withViewTransitions } from '@angular/router';

export const withViewTransitionsConfig = () =>
  withViewTransitions({
    onViewTransitionCreated: ({ transition }) => {
      const router = inject(Router);
      const targetUrl = router.getCurrentNavigation()!.finalUrl!;
      // Skip transition if only fragment or query params change
      const config = {
        paths: 'exact',
        matrixParams: 'exact',
        fragment: 'ignored',
        queryParams: 'ignored',
      } as const;
      if (router.isActive(targetUrl, config)) {
        transition.skipTransition();
      }
    },
  });
