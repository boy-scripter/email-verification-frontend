import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

export interface ValidationVisibilityStrategy {
  showError(control: AbstractControl): Observable<boolean>;
}
