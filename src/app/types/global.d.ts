import { Signal } from '@angular/core';
import { MutationResult } from '@apollo-orbit/angular';

export {};

declare global {
  type PatchedMutationResult<T = unknown> = Omit<MutationResult, 'data'> & {
    data: T;
  };

  type SignalMutationResult<T = unknown> = Signal<PatchedMutationResult<T>>;
}
