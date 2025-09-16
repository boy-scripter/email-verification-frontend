import { AbstractControl } from "@angular/forms";
import { map, startWith, Observable } from "rxjs";

export type errorConfigType = Record<string, ((value?: any) => string) | string>
export type ErrorMessageType = Observable<string | null>


export const DEFAULT_ERROR_MESSAGES: errorConfigType = {
    required: 'This field is required',
    minlength: v => `Minimum length is ${v.requiredLength}, but got ${v.actualLength}`,
    maxlength: v => `Maximum length is ${v.requiredLength}, but got ${v.actualLength}`,
    email: 'Please enter a valid email address',
};

function normalizeMessage(msg?: errorConfigType[string], value?: any): string | undefined {
    if (!msg) return undefined;
    return typeof msg === 'function' ? msg(value) : msg;
}

export function getErrorMessage(
    key: string,
    value: any,
    config: errorConfigType = {}
): string {
   
    return normalizeMessage(config[key], value)
        ?? normalizeMessage(DEFAULT_ERROR_MESSAGES[key], value)
        ?? 'Invalid field';
}


export function firstErrorMessage$(
    control: AbstractControl,
    config?: errorConfigType
): ErrorMessageType {
    return control.statusChanges.pipe(
        startWith(control.status),
        map(() => control.errors ?? {}),
        map(errors => {
            const [key, value] = Object.entries(errors)[0] ?? [];
            return key ? getErrorMessage(key, value, config) : null;
        })
    );
}

