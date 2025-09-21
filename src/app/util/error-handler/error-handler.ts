import { AbstractControl } from '@angular/forms';
import { map, Observable, startWith, tap } from 'rxjs';
import { DEFAULT_ERROR_MESSAGES, errorConfigType } from './error-message';

export type ErrorMessageType = Observable<string | null>;

function normalizeMessage(msg?: errorConfigType[string], value?: any): string | undefined {
  if (!msg) return undefined;
  return typeof msg === 'function' ? msg(value) : msg;
}

export function getErrorMessage(key: string, value: any, config: errorConfigType = {}): string {
  return (
    normalizeMessage(config[key], value) ??
    normalizeMessage(DEFAULT_ERROR_MESSAGES[key], value) ??
    'Invalid field'
  );
}

export function firstErrorMessage$(
  control: AbstractControl,
  config?: errorConfigType,
): ErrorMessageType {
  return control.statusChanges.pipe(
    startWith(control.status),
    map(() => control.errors ?? {}),
    map((errors) => {
      const [key, value] = Object.entries(errors)[0] ?? [];
      return key ? getErrorMessage(key, value, config) : null;
    }),
    tap(() => {
      console.log(control);
    }),
  );
}
