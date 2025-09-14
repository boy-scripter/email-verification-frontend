import { computed, Directive, signal, input, ElementRef, inject } from "@angular/core";
import { Button } from "primeng/button";
import { Observable, firstValueFrom } from "rxjs";

@Directive({
    selector: '[asyncTask]',
    standalone: true,
    host: {
        '(click)': 'handleClick()',
    }
})
export class AsyncTaskDirective {
    private btnRef = inject<Button>(Button);


    asyncTask = input.required<Promise<any> | Observable<any>>();
    isLoading = computed(() => this.loading());

    private loading = signal(false)

    constructor() { }

    async handleClick() {
        if (!this.asyncTask()) {
            console.warn('asyncTask directive: No task provided!');
            return;
        }

        try {
            this.taskStart();
            const task = this.asyncTask();

            const result = task instanceof Observable
                ? await firstValueFrom(task)
                : await task;

            this.taskComplete();
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
        this.loading.set(false);
        this.btnRef.loading = false;

    }
}