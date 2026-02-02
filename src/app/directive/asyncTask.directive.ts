import { computed, Directive, inject, input, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { firstValueFrom, Observable } from 'rxjs';

@Directive({
  selector: '[appAsyncTask]',
  standalone: true,
  host: {
    '(click)': 'handleClick()',
  },
})
export class AsyncTaskDirective {
  private btnRef = inject<Button>(Button);

  asyncTask = input.required<Promise<any> | Observable<any>>();
  isLoading = computed(() => this.loading());
  private loading = signal(false);

  async handleClick() {
    if (!this.asyncTask()) {
      console.warn('asyncTask directive: No task provided!');
      return;
    }

    try {
      this.taskStart();
      const task = this.asyncTask();
      if (task instanceof Promise) {
        await task;
      } else {
        await firstValueFrom(task as Observable<any>);
      }
    } catch (err) {
      this.taskError(err instanceof Error ? err : new Error('Task failed'));
    }
  }

  private taskStart() {
    this.loading.set(true);
    this.btnRef.loading = true;
  }

  private taskComplete() {
    this.loading.set(false);
    this.btnRef.loading = false;
  }

  private taskError(error: Error) {
    console.error(error);
    this.loading.set(false);
    this.btnRef.loading = false;
  }
}
