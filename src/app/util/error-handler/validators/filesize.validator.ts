import { AbstractControl, ValidatorFn } from '@angular/forms';

export const FILE_SIZE_MIN_ERROR = 'filesizeMin';
export const FILE_SIZE_MAX_ERROR = 'filesizeMax';

export function fileSizeValidator(minSize = 0, maxSize?: number): ValidatorFn {
  return (control: AbstractControl) => {
    const file = control.value;
    if (file) {
      if (minSize && file.size < minSize) {
        return { [FILE_SIZE_MIN_ERROR]: true };
      }
      if (maxSize && file.size > maxSize) {
        return { [FILE_SIZE_MAX_ERROR]: true };
      }
    }
    return null;
  };
}
