import { Component, AfterContentInit, input, contentChild, signal, Signal, inject, EnvironmentInjector } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MessageModule } from 'primeng/message';
import { NgControl } from '@angular/forms';
import { ErrorMessageType, firstErrorMessage$ } from '@util/error-handler';
import { toSignal } from '@angular/core/rxjs-interop';


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

      @if (errorsMessage()) {
        <p-message styleClass="mt-1 pl-2" severity="error"  size="small"  variant="simple"  >
          <span> {{errorsMessage()}} </span>    
       </p-message>
      }
    </div>
  `
})
export class InputComponent implements AfterContentInit {

  icon = input<string>();
  ngControl = contentChild.required(NgControl)
  errorsMessage: Signal<string | null> = signal(null);


  injector = inject(EnvironmentInjector);
  constructor() { }

  ngAfterContentInit() {
    const control = this.ngControl()?.control;
    if (!control) {
      console.warn('⚠️ app-input: No form control found inside');
      return;
    }

    this.errorsMessage = toSignal(firstErrorMessage$(control), {
      initialValue: null,
      injector : this.injector
    });
  }
}


