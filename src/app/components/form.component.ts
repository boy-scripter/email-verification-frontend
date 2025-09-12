import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {  ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="flex flex-col gap-6 p-6  rounded-lg shadow-sm">
            <div class="pb-4 border-b border-gray-200">
                <h2 class="m-0 text-2xl text-white font-semibold ">{{ header() }}</h2>
            </div>
            <div class="grid gap-4">
                <ng-content></ng-content>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
    header = input.required<string>();
}
