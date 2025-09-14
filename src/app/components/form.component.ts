import { CommonModule } from '@angular/common';
import {  ChangeDetectionStrategy, Component, contentChild, ElementRef, inject, input, signal} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Button } from 'primeng/button';
import { filter } from 'rxjs';


export type RawValue<T extends FormGroup> = T extends FormGroup<any> ? ReturnType<T['getRawValue']> : never;
export type functionType = (value: RawValue<FormGroup>) => Promise<void>;
@Component({
    selector: 'app-form',
    standalone: true,
    imports: [],
    template: `
        <form class="flex flex-col gap-6 p-6 px-1 sm:px-4  rounded-lg shadow-sm" (ngSubmit)="onSubmit()">
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

    constructor() {

        this.ngForm.ngSubmit.pipe(
            takeUntilDestroyed(),
            filter(() => this.ngForm.form.valid && !this.isSubmitting())
        ).subscribe(() => this.onSubmit())

    }

    async onSubmit() {


        this.setLoading(true)
        try {
            await new Promise(resolve => setTimeout(resolve, 4000));
            await this.formSubmit()?.(this.ngForm.form.getRawValue());
        } finally {
            this.setLoading(false)
        }
    }


    setLoading(value : boolean) {
        this.isSubmitting.set(value);
        this.submitBtn().loading = value;
       console.log(this.submitBtn())
    }
}
