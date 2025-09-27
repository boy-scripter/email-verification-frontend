import { EnvironmentInjector, inject, Injectable, runInInjectionContext } from '@angular/core';
import { NormalUploadStrategy } from './stratergy/normal.startegy';

export type UploadStrategyType = 'normal';

@Injectable({ providedIn: 'root' })
export class UploadStrategyFactory {
  private injector = inject(EnvironmentInjector);

  getStrategy(type: 'normal' | 'multipart') {
    switch (type) {
      case 'normal':
        return runInInjectionContext(this.injector, () => inject(NormalUploadStrategy));
      default:
        return runInInjectionContext(this.injector, () => inject(NormalUploadStrategy));
    }
  }
}
