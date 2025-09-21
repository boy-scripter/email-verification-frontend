import { AbstractControl, ValidatorFn } from '@angular/forms';

export const FILETYPE_ERROR = 'filetype';
export function fileTypeValidator(allowedTypes: string[]): ValidatorFn {
  return (control: AbstractControl) => {
    const file = control.value;
    if (file && !allowedTypes.includes(file.type)) {
      return { [FILETYPE_ERROR]: true };
    }
    return null;
  };
}
