

import { ValidationVisibilityStrategy } from './abstract';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, takeWhile } from 'rxjs/operators';

export class BlurStrategy implements ValidationVisibilityStrategy {
  showError(control: AbstractControl): Observable<boolean> {
    return control.statusChanges.pipe(
      map(() => control.touched && control.invalid),
      startWith(control.touched && control.invalid),
      takeWhile(value => !value, true)
    );
  }
}
