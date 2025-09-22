import { AbstractControl, ValidatorFn } from '@angular/forms';


export const FILETYPE_ERROR = 'filetype';
export function fileTypeValidator(allowedTypes: string[]): ValidatorFn {
  return (control: AbstractControl) => {
    const file = control.value;

    if (file && file.type && !allowedTypes.includes(file.type)) {
      return {
        [FILETYPE_ERROR]: {
          allowedTypes,
          actualType: file.type
        }
      };
    }

    return null;
  };
}
