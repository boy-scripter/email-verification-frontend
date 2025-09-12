import { AbstractControl } from "@angular/forms";
import { toSignal } from "@angular/core/rxjs-interop";
import { map, filter, startWith, Observable } from "rxjs";
import { Signal } from "@angular/core";


export const DEFAULT_ERROR_MESSAGES: Record<string, (value: any) => string> = {
    required: () => 'This field is required',
    minlength: v => `Minimum length is ${v.requiredLength}, but got ${v.actualLength}`,
    maxlength: v => `Maximum length is ${v.requiredLength}, but got ${v.actualLength}`,
    email: () => 'Please enter a valid email address',
};

export function getErrorMessage(
    key: string,
    value: any,
    config: Record<string, (value?: any) => string> = {}
): string {
    return config[key]?.(value)
        ?? DEFAULT_ERROR_MESSAGES[key]?.(value)
        ?? 'Invalid field';
}


export function firstErrorMessage$(
    control: AbstractControl,
    config?: Record<string, (value: any) => string>
) : ErrorMessageType {
    return control.statusChanges.pipe(
        startWith(control.status),
        map(() => control.errors ?? {}),
        map(errors => {
            const [key, value] = Object.entries(errors)[0] ?? [];
            return key ? getErrorMessage(key, value, config) : null;
        })
    );
}

export type ErrorMessageType = Observable<string | null>