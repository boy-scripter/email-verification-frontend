import {
  ComponentRef,
  DestroyRef,
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProgressSpinner } from 'primeng/progressspinner';
import { from, isObservable, Observable, Subscription } from 'rxjs';

interface WithLoaderContext<T> {
  $implicit: T;
  withLoader: T;
  error?: any;
}

@Directive({
  selector: '[appWithLoader]',
  standalone: true,
})
export class WithLoaderDirective<T> {
  // ================================
  // Dependencies
  // ================================

  private readonly templateRef = inject<TemplateRef<WithLoaderContext<T>>>(TemplateRef);
  private readonly vcr = inject(ViewContainerRef);
  private readonly destroyRef = inject(DestroyRef);

  // ================================
  // Inputs (Signals)
  // ================================
  readonly withLoader = input.required<Promise<T> | Observable<T>>();
  readonly withLoaderLoading = input<TemplateRef<unknown> | null>(null);
  readonly withLoaderError = input<TemplateRef<{ $implicit: unknown }> | null>(null);

  // ================================
  // Internal State
  // ================================
  private subscription?: Subscription;
  private spinnerRef?: ComponentRef<ProgressSpinner>;

  // ================================
  // Constructor
  // ================================
  constructor() {
    effect(() => {
      const source = this.withLoader();
      this.execute(source);
    });
  }

  // ================================
  // Core Execution
  // ================================
  private execute(source: Promise<T> | Observable<T>): void {
    this.cleanupSubscription();
    this.renderLoading();

    const observable$ = this.toObservable(source);

    this.subscription = observable$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (value) => this.handleSuccess(value),
      error: (err) => this.handleError(err),
    });
  }

  // ================================
  // Handlers
  // ================================
  private handleSuccess(value: T): void {
    this.clearView();
    this.templateRef.createEmbeddedView(this.templateRef, {
      $implicit: value,
      withLoader: value,
    });
    this.vcr.insert(
      this.templateRef.createEmbeddedView({
        $implicit: value,
        withLoader: value,
      }),
    );
  }

  private handleError(error: any): void {
    this.clearView();

    const errorTemplate = this.withLoaderError();

    if (errorTemplate) {
      this.vcr.createEmbeddedView(errorTemplate, {
        $implicit: error,
      });
    } else {
      console.error('[withLoader] Error:', error);
    }
  }

  // ================================
  // Loading Renderer
  // ================================
  private renderLoading(): void {
    this.clearView();

    const loadingTemplate = this.withLoaderLoading();

    if (loadingTemplate) {
      this.vcr.createEmbeddedView(loadingTemplate);
      return;
    }

    // Default PrimeNG spinner (Angular-safe)
    this.spinnerRef = this.vcr.createComponent(ProgressSpinner as Type<ProgressSpinner>);
  }

  // ================================
  // Utilities
  // ================================
  private toObservable(source: Promise<T> | Observable<T>): Observable<T> {
    return isObservable(source) ? source : from(source);
  }

  private cleanupSubscription(): void {
    this.subscription?.unsubscribe();
    this.subscription = undefined;
  }

  private clearView(): void {
    this.cleanupSubscription();
    this.spinnerRef?.destroy();
    this.spinnerRef = undefined;
    this.vcr.clear();
  }
}
