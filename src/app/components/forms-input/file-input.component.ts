import { Directive, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getPreviewUrl } from "@util/index";

export interface UploadableFile extends File {
    filetype: FILE_SUPPORTED_BACKEND;
    preview: string
}
type FILE_SUPPORTED_BACKEND = "AVTAR_IMAGE"
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

    fileType = input<FILE_SUPPORTED_BACKEND>()

    value: FileInputType = null;

    // Callbacks assigned by Angular
    onChange: (value: FileInputType) => void = () => { };
    onTouched: () => void = () => { };

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

        if (!input.files || input.files.length === 0) {
            this.value = null;
            this.onChange(null);
            return;
        }

        const files = Array.from(input.files) as UploadableFile[];

        // Attach fileType metadata to each file
        const uploadableFiles = files.map(file =>
            Object.assign(file, {
                fileType: this.fileType(),
                preview: getPreviewUrl(file)
            })
        );

        // Detect if multiple attribute is set on input element
        if (input.multiple) {
            this.onChange(uploadableFiles);
        } else {
            this.onChange(uploadableFiles[0]);
        }
    }

    onBlur(): void {
        this.onTouched();
    }
}




