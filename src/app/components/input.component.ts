import { Component, computed, AfterContentInit, input, contentChild } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MessageModule } from 'primeng/message';
import { NgControl } from '@angular/forms';

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
          <span> {{firstErrorMessage()}} </span>    
       </p-message>
      }
    </div>
  `
})
export class InputComponent implements AfterContentInit {

  icon = input<string>();
  ngControl = contentChild(NgControl)
  errorMessage = signal('')

  showError = computed(() => {
    ctrl?.statusChanges?.subscribe(
      () => 
    )
    const ctrl = this.ngControl();
    return !!ctrl?.control && ctrl.control.invalid && (ctrl.control.dirty || ctrl.control.touched);
  });

  constructor() { }

  firstErrorMessage = computed(() => {
    const ctrl = this.ngControl()?.control;
    if (!ctrl?.errors) return undefined;
    if (ctrl.errors['required']) return 'This field is required';
    if (ctrl.errors['minlength']) return `Min length is ${ctrl.errors['minlength'].requiredLength}`;
    if (ctrl.errors['maxlength']) return `Max length is ${ctrl.errors['maxlength'].requiredLength}`;
    if (ctrl.errors['email']) return 'Invalid email address';
    return 'Invalid input';
  });

  ngAfterContentInit() {  
    if (!this.ngControl) {
      console.warn('⚠️ app-input: No form control found inside');
    } else {

    }
  }
}


