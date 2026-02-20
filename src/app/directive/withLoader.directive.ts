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

@Directive({
  selector: '[appWithLoader]',
  standalone: true,
})
export class WithLoaderDirective {
  private readonly templateRef = inject<TemplateRef<unknown>>(TemplateRef); // original template
  private readonly vcr = inject(ViewContainerRef);
  private readonly destroyRef = inject(DestroyRef);

  readonly withLoader = input.required<Promise<any> | Observable<any>>();
  readonly withLoaderLoading = input<TemplateRef<unknown> | null>(null);

  private subscription?: Subscription;
  private spinnerRef?: ComponentRef<ProgressSpinner>;

  constructor() {
    effect(() => {
      if (this.withLoader()) {
        this.execute(this.withLoader());
      }
    });
  } 

  private execute(source: Promise<any> | Observable<any>): void {
    this.cleanup();
    this.renderLoading();

    const observable$ = isObservable(source) ? source : from(source);

    this.subscription = observable$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.renderTemplate(), // render original content on success
        error: (err) => this.handleError(err),
      });
  }

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

    if (this.withLoaderLoading()) {
      this.vcr.createEmbeddedView(this.withLoaderLoading()!);
    } else {
      this.spinnerRef = this.vcr.createComponent(ProgressSpinner as Type<ProgressSpinner>);
    }
  }

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