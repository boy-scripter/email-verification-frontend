import { AbstractControl, ValidatorFn } from '@angular/forms';

export const FILE_SIZE_MIN_ERROR = 'filesizeMin';
export const FILE_SIZE_MAX_ERROR = 'filesizeMax';

// Helper to format size nicely (KB or MB)
function formatSizeKB(sizeKB: number): string {
  if (sizeKB >= 1024) {
    return (sizeKB / 1024).toFixed(2) + ' MB';
  } else {
    return sizeKB.toFixed(2) + ' KB';
  }
}

export function fileSizeValidator(minSizeKB = 0, maxSizeKB?: number): ValidatorFn {
  const minSizeBytes = minSizeKB * 1024;
  const maxSizeBytes = maxSizeKB ? maxSizeKB * 1024 : undefined;

  return (control: AbstractControl) => {
    const file = control.value;

    if (file && file.size != null) {
      const errors: any = {};

      if (minSizeBytes && file.size < minSizeBytes) {
        errors[FILE_SIZE_MIN_ERROR] = {
          requiredSize: formatSizeKB(minSizeKB),
          actualSize: formatSizeKB(file.size / 1024),
        };
      }

      if (maxSizeBytes && file.size > maxSizeBytes) {
        errors[FILE_SIZE_MAX_ERROR] = {
          requiredSize: formatSizeKB(maxSizeKB!),
          actualSize: formatSizeKB(file.size / 1024),
        };
      }

      return Object.keys(errors).length ? errors : null;
    }

    return null;
  };
}
