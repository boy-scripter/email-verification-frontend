import { createEnvironmentInjector, EnvironmentInjector, inject, Injectable } from '@angular/core';
import { NormalUploadStrategy } from './stratergy/normal.startegy';

export type UploadStrategyType = 'normal' | 'multipart';

@Injectable({ providedIn: 'root' })
export class UploadStrategyFactory {
  private parentInjector = inject(EnvironmentInjector);

  getStrategy(type: UploadStrategyType) {
    const childInjector = createEnvironmentInjector([NormalUploadStrategy], this.parentInjector);

    switch (type) {
      case 'normal':
        return childInjector.get(NormalUploadStrategy);
      default:
        return childInjector.get(NormalUploadStrategy);
    }
  }
}
