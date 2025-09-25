
import { AbstractControl, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { ValidationVisibilityStrategy } from './abstract';

export class SubmitStrategy implements ValidationVisibilityStrategy {
    constructor(private ngForm: FormGroupDirective) {}

  showError(_control: AbstractControl): Observable<boolean> {
    return this.ngForm.ngSubmit.pipe(
      take(1),
      map(() => true),
      startWith(false),
    );
  }
}
