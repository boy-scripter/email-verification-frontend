


import { Component, input, inject, EnvironmentInjector, Signal, signal, AfterContentInit, ChangeDetectorRef, } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { FormGroupDirective } from '@angular/forms';
import { errorConfigType, firstErrorMessage$ } from '@util/error-handler';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormComponent } from '@components/index';
import { getValidationStrategy } from './strategy-factory';

@Component({
  imports: [MessageModule],
  selector: 'app-error-control',
  template: `
    @if (showError()) {
      <p-message styleClass="mt-1 pl-2" severity="error" size="small" variant="simple">
        <span >{{errorsMessage()}}</span>    
      </p-message>
    }
  `
})
export class ErrorControlComponent implements AfterContentInit {

  // Inputs
  errorConfig = input<errorConfigType>();
  controlName = input.required<string>()
  
  // Variables
  protected errorsMessage: Signal<string | null> = signal(null);
  protected showError: Signal<boolean> = signal(false);
  
  // Injections
  formGroup = inject(FormGroupDirective);
  ngForm = inject(FormGroupDirective);
  injector = inject(EnvironmentInjector);
  formComponent = inject(FormComponent);


  ngAfterContentInit() {
    const control = this.formGroup.form.get(this.controlName());

    if (!control) {
      console.warn('⚠️ app-error-control: No form control found inside');
      return;
    }

    const strategy = getValidationStrategy( 
      this.formComponent.updateOn(),
      this.ngForm
    );

    this.showError = toSignal(strategy.showError(control), {
      initialValue: false,
      injector: this.injector
    });

    this.errorsMessage = toSignal(firstErrorMessage$(control, this.errorConfig()), {
      initialValue: null,
      injector: this.injector
    });
  
  }
  
}


