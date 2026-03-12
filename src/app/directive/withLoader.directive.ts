import {
  ComponentRef,
  DestroyRef,
  Directive,
  inject,
  input,
  OnInit,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SpinnerComponent } from '@components/loaders/spinner.component';
import { from, isObservable, Observable, Subscription } from 'rxjs';

// ✅ Callback type: a function that returns a Promise or Observable
export type LoaderCallback<T = any> = () => Promise<T> | Observable<T>;

@Directive({
  selector: '[appWithLoader]',
  standalone: true,
})
export class WithLoaderDirective implements OnInit {
  private readonly templateRef = inject<TemplateRef<unknown>>(TemplateRef);
  private readonly vcr = inject(ViewContainerRef);
  private readonly destroyRef = inject(DestroyRef);

  // ================================
  // Inputs
  // ================================
  readonly appWithLoader = input.required<LoaderCallback>();        // ✅ Now a callback
  readonly appWithLoaderLoading = input<TemplateRef<unknown> | null>(null);

  // ================================
  // Internal State
  // ================================
  private subscription?: Subscription;
  private spinnerRef?: ComponentRef<SpinnerComponent>;

  // ================================
  // ngOnInit — execute once
  // ================================
  ngOnInit(): void {
    this.renderTemplate();

    const loaderFn = this.appWithLoader();   // ✅ Get the callback
    if (loaderFn) {
      this.execute(loaderFn);                // ✅ Pass callback, not its result
    }
  }

  // ================================
  // Core Execution
  // ================================
  private execute(loaderFn: LoaderCallback): void {
    const DEBOUNCE = 1000 * 2;

    const taskId = setTimeout(() => {
      this.cleanup();
      this.renderLoading();
    }, DEBOUNCE);

    // ✅ Invoke the callback HERE — lazy, controlled invocation
    const source = loaderFn();
    const observable$ = isObservable(source) ? source : from(source);

    this.subscription = observable$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (data: any) => {
        clearTimeout(taskId);
        this.renderTemplate(data);
      },
      error: (err) => {
        clearTimeout(taskId);
        this.handleError(err);
      },
    });
  }

  // ================================
  // Template Renderers
  // ================================
  private renderTemplate(data: any = {}): void {
    this.clearView();
    this.vcr.createEmbeddedView(this.templateRef, data);
  }

  private handleError(error: any): void {
    this.clearView();
    const div = document.createElement('div');
    div.textContent = 'Something went wrong.';
    div.style.color = 'red';
    this.vcr.element.nativeElement.appendChild(div);
    console.error('[withLoaderDirective] Error:', error);
  }

  private renderLoading(): void {
    this.clearView();
    const loadingTemplate = this.appWithLoaderLoading();
    if (loadingTemplate) {
      this.vcr.createEmbeddedView(loadingTemplate);
    } else {
      this.spinnerRef = this.vcr.createComponent(SpinnerComponent as Type<SpinnerComponent>);
    }
  }

  // ================================
  // Cleanup
  // ================================
  private cleanup(): void {
    this.subscription?.unsubscribe();
    this.subscription = undefined;
    this.spinnerRef?.destroy();
    this.spinnerRef = undefined;
    this.vcr.clear();
  }

  private clearView(): void {
    this.cleanup();
  }
}