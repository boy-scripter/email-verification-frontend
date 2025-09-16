import { Component, AfterContentInit, input, contentChild, signal, Signal, inject, EnvironmentInjector } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MessageModule } from 'primeng/message';
import { FormGroupDirective, NgControl } from '@angular/forms';
import { errorConfigType, firstErrorMessage$ } from '@util/error-handler';
import { toSignal } from '@angular/core/rxjs-interop';
import {  map, startWith, take } from 'rxjs';


@Component({
  imports: [InputGroupModule, InputGroupAddonModule, MessageModule],
  selector: 'app-input',
  template: `
    <div class="input-wrapper">
      <p-inputgroup>
        @if (icon()){
          <p-inputgroup-addon>
            <i [class]="'pi ' + icon()"></i>
          </p-inputgroup-addon>
        }
        <ng-content></ng-content>
      </p-inputgroup>

      @if (showError()) {
        <p-message styleClass="mt-1 pl-2" severity="error"  size="small"  variant="simple"  >
          <span> {{errorsMessage()}} </span>    
       </p-message>
      }
    </div>
  `
})
export class InputComponent implements AfterContentInit {
  // inputts an chilkdren quewry 
  icon = input<string>();
  errorConfig = input<errorConfigType>();
  ngControl = contentChild.required(NgControl)

  //injections
  ngForm = inject(FormGroupDirective)
  injector = inject(EnvironmentInjector);

  //varibles
  protected errorsMessage: Signal<string | null> = signal(null);
  protected showError: Signal<boolean> = signal(false)

  constructor() { }

  ngAfterContentInit() {
    const control = this.ngControl()?.control;

    if (!control) {
      console.warn('⚠️ app-input: No form control found inside');
      return;
    } 

    // Emits true only after the first submit
    const firstSubmit$ = this.ngForm.ngSubmit.pipe(
      take(1),
      map(() => true),
      startWith(false)
    );

    this.showError = toSignal(firstSubmit$, {
      initialValue: false,
      injector: this.injector
    })

    this.errorsMessage = toSignal(firstErrorMessage$(control , this.errorConfig()), {
      initialValue: null,
      injector: this.injector
    });
  }
}


