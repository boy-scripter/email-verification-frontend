import { Directive, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type FileInputType = File | File[] | null

@Directive({
    selector: '[appFileInput]',
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

    value: FileInputType = null;

    // Callbacks assigned by Angular
    onChange: (value: FileInputType) => void = (value :FileInputType) => {
        //empty
     };

    onTouched: () => void = () => {
        //empty
     };

    // Angular calls this to update the input value
    writeValue(value: File | null): void {
        this.value = value;
    }

    registerOnChange(fn: (value: FileInputType) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    // Event handlers using classic method syntax

    onInput(event: Event): void {
        const input = event.target as HTMLInputElement;

        this.onTouched();
        if (!input.files || input.files.length === 0) {
            this.value = null;
            this.onChange(null);
            return;
        }

        const files = Array.from(input.files);

        if (input.multiple) {
            this.onChange(files);
        } else {
            this.onChange(files[0]);
        }

        input.value = '';
    }


    onBlur(): void {
        this.onTouched();
    }
}




