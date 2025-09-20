import { Directive, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
    selector: '[cfileInput]',
    host: {
        '(change)': 'onInput($event)',
        '(blur)': 'onBlur()'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FileInputDirective),
            multi: true
        }
    ]
})
export class FileInputDirective implements ControlValueAccessor {

    value: File | null = null;

    // Callbacks assigned by Angular
    onChange: (value: File | null) => void = () => { };
    onTouched: () => void = () => { };

    // Angular calls this to update the input value
    writeValue(value: File | null): void {
        this.value = value;
    }

    registerOnChange(fn: (value: File | null) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    // Event handlers using classic method syntax
    onInput(event: Event): void {
        const input = event.target as HTMLInputElement;
        const file = input.files && input.files.length > 0 ? input.files[0] : null;
        this.value = file;
        this.onChange(this.value);
    }

    onBlur(): void {
        this.onTouched();
    }
}
