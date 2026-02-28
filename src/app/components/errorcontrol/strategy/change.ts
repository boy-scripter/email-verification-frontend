import { ValidationVisibilityStrategy } from './abstract';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap, map, startWith, takeWhile } from 'rxjs/operators';

export class ChangeStrategy implements ValidationVisibilityStrategy {
  showError(control: AbstractControl): Observable<boolean> {
    return control.statusChanges.pipe(
      // tap(() => console.log(control.touched , control.invalid)),
      map(() => control.touched && control.invalid),
      startWith(control.touched && control.invalid),
      takeWhile(value => !value, true)
    );
  }
}
