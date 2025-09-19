
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, contentChild, inject, input, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Button } from 'primeng/button';
import { filter, firstValueFrom, timer } from 'rxjs';
import { twMerge } from 'tailwind-merge';



export type RawValue<T extends FormGroup> = T extends FormGroup<any> ? ReturnType<T['getRawValue']> : never;
export type FormType<FormValues extends FormGroup> = RawValue<FormValues> & {
    nextTask: () => void
};

@Component({
    selector: 'app-form',
    standalone: true,
    imports: [],
    template: `
        <form [class]="computedClass()" >
            <div class="pb-4 border-b border-gray-200">
                <h2 class="m-0 text-2xl text-white font-semibold ">{{ header() }}</h2>
            </div>
            <div class="grid gap-5">
                <ng-content></ng-content>
            </div>
        </form>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
    header = input.required<string>();

    styleClass = input<string>();
    computedClass = computed(() => twMerge('flex flex-col gap-6 p-6 px-1 sm:px-4  rounded-lg shadow-sm' + this.styleClass()))

    formSubmit = output<FormType<FormGroup>>();

    submitBtn = contentChild.required<'submitBtn', Button>('submitBtn', {
        read: Button
    });
    isSubmitting = signal(false);

    ngForm = inject(FormGroupDirective);
    cdr = inject(ChangeDetectorRef);

    constructor() {

        this.ngForm.ngSubmit.pipe(
            takeUntilDestroyed(),
            filter(() => this.ngForm.form.valid && !this.isSubmitting())
        ).subscribe(() => this.onSubmit())

    }
    async onSubmit() {
        if (!this.submitBtn) {
            throw new Error('Submit Btn Not Found')
        }

        this.setLoading(true);

        await firstValueFrom(timer(1000));

        this.formSubmit.emit({
            ...this.ngForm.form.getRawValue(),
            nextTask: () => {
                this.setLoading(false);
            }
        });

    }

    setLoading(value: boolean) {
        this.isSubmitting.set(value);  // Use the signal
        this.submitBtn().loading = value;
        this.submitBtn().cd.markForCheck();
    }

}
