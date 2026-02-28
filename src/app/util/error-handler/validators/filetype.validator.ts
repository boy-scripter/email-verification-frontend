import { AbstractControl, ValidatorFn } from '@angular/forms';

export const FILETYPE_ERROR = 'filetype';
export function fileTypeValidator(allowedExtensions: string[]): ValidatorFn {
  return (control: AbstractControl) => {
    const file = control.value;

    if (!file) {
      return null;
    }
    
    const fileName = file.name?.toLowerCase() || '';
    const extension = fileName.split('.').pop();

    if (!extension || !allowedExtensions.map((e) => e.toLowerCase()).includes(extension)) {
      return {
        [FILETYPE_ERROR]: {
          allowedExtensions,
          actualExtension: extension,
        },
      };
    }

    return null;
  };
}
