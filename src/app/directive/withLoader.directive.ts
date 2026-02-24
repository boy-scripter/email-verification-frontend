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

@Directive({
  selector: '[appWithLoader]',
  standalone: true,
})
export class WithLoaderDirective implements OnInit {
  private readonly templateRef = inject<TemplateRef<unknown>>(TemplateRef); // original template
  private readonly vcr = inject(ViewContainerRef);
  private readonly destroyRef = inject(DestroyRef);

  // ================================
  // Inputs (using input.required as requested)
  // ================================
  readonly appWithLoader = input.required<Promise<any> | Observable<any>>();
  readonly appWithLoaderLoading = input<TemplateRef<unknown> | null>(null);

  // ================================
  // Internal State
  // ================================
  private subscription?: Subscription;
  private spinnerRef?: ComponentRef<SpinnerComponent>;
  private source?: Promise<any> | Observable<any>; // store promise/observable

  // ================================
  // ngOnInit — execute once
  // ================================
  ngOnInit(): void {
    const loader = this.appWithLoader();
    if (loader) {
      this.source = loader;
      this.execute(this.source);
    }
  }

  // ================================
  // Core Execution
  // ================================
  private execute(source: Promise<any> | Observable<any>): void {
    const DEBOUNCE = 1000 * 2;

    const taskId = setTimeout(() => {
      this.cleanup();
      this.renderLoading();
    }, DEBOUNCE);

    const observable$ = isObservable(source) ? source : from(source);

    this.subscription = observable$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        clearTimeout(taskId);
        this.renderTemplate(); // render original content on success
      },
      error: (err) => this.handleError(err),
    });
  }

  // ================================
  // Template Renderers
  // ================================
  private renderTemplate(): void {
    this.clearView();
    this.vcr.createEmbeddedView(this.templateRef);
  }

  private handleError(error: any): void {
    this.clearView();

    const div = document.createElement('div');
    div.textContent = 'Something went wrong.';
    div.style.color = 'red';
    this.vcr.element.nativeElement.appendChild(div);

    console.error('[WithLoaderDirective] Error:', error);
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
