import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function PasswordMatch(matchWith: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.parent) {
            return null; // parent not yet created
        }

        const matchingControl = control.parent.get(matchWith);
        if (!matchingControl) {
            return null; // reference control not found
        }

        if (control.value !== matchingControl.value) {
            return { mismatch: true };
        }

        return null;
    };
}
