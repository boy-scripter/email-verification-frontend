import { Directive, inject, input, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { firstValueFrom, isObservable, Observable } from 'rxjs';

@Directive({
  selector: '[appAsyncTask]',
  standalone: true,
  host: {
    '(click)': 'handleClick($event)',
  },
})
export class AsyncTaskDirective {
  private btnRef = inject(Button);
  public appAsyncTask = input.required<() => Promise<unknown> | Observable<unknown>>();

  private loading = signal(false);

  async handleClick(event: Event) {
    if (this.loading()) {
      event.preventDefault();
      return;
    }

    const taskFactory = this.appAsyncTask();
    if (!taskFactory) {
      console.warn('appAsyncTask directive: No task provided!');
      return;
    }

    try {
      this.taskStart();

      const task = taskFactory();

      if (isObservable(task)) {
        await firstValueFrom(task);
      } else {
        await task;
      }

      this.taskComplete();
    } catch (err) {
      this.taskError(err instanceof Error ? err : new Error('Task failed'));
    }
  }

  private taskStart() {
    this.loading.set(true);
    this.btnRef.loading = true;
    this.btnRef.disabled = true;
  }

  private taskComplete() {
    this.loading.set(false);
    this.btnRef.loading = false;
    this.btnRef.disabled = false;
    this.btnRef.cd.detectChanges()

  }

  private taskError(err : Error) {
    this.loading.set(false);
    this.btnRef.loading = false;
    this.btnRef.disabled = false;
    this.btnRef.cd.detectChanges()
  }
}
