
import {  ChangeDetectionStrategy, ChangeDetectorRef, Component, contentChild, inject, input, signal} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Button } from 'primeng/button';
import { filter, firstValueFrom, timer } from 'rxjs';


export type RawValue<T extends FormGroup> = T extends FormGroup<any> ? ReturnType<T['getRawValue']> : never;
export type functionType = (value: RawValue<FormGroup>) => Promise<void>;
@Component({
    selector: 'app-form',
    standalone: true,
    imports: [],
    template: `
        <form class="flex flex-col gap-6 p-6 px-1 sm:px-4  rounded-lg shadow-sm" >
            <div class="pb-4 border-b border-gray-200">
                <h2 class="m-0 text-2xl text-white font-semibold ">{{ header() }}</h2>
            </div>
            <div class="grid gap-4">
                <ng-content></ng-content>
            </div>
        </form>
    `,
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
    header = input.required<string>();
    formSubmit = input<functionType>();

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
        this.setLoading(true);
        try {
            await firstValueFrom(timer(4000));
            await this.formSubmit()?.(this.ngForm.form.getRawValue());
        } finally {
            this.setLoading(false);
            
        }
    }

    setLoading(value: boolean) {
        this.isSubmitting.set(value);  // Use the signal
        this.submitBtn().loading = value;
        this.submitBtn().cd.markForCheck();
    }
 
}
