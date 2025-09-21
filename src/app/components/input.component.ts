import { Component, input, computed, contentChild } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { NgControl } from '@angular/forms';
import { errorConfigType } from '@util/error-handler';
import { twMerge } from 'tailwind-merge';
import { ErrorControlComponent } from './errorcontrol.component';


@Component({
  imports: [InputGroupModule, InputGroupAddonModule, ErrorControlComponent],
  selector: 'app-input',
  template: `
    <div class="input-wrapper">
      <p-inputgroup >
        @if (icon()){
          <p-inputgroup-addon [styleClass]="computedIconClass()">
            <i [class]="' pi ' + icon()"></i>
          </p-inputgroup-addon>
        }
        <ng-content></ng-content>
      </p-inputgroup>

            @if(ngControl()){
              <app-error-control [controlName]="controlName()" [errorConfig]="errorConfig()"> </app-error-control>
            }
    </div>
  `
})
export class InputComponent {

  // html class handling 
  iconStyleClass = input<string>('');
  computedIconClass = computed(() => twMerge('items-center', this.iconStyleClass()));

  // inputs
  icon = input<string>();
  errorConfig = input<errorConfigType>();

  // contentchild
  ngControl = contentChild(NgControl);
  controlName = computed(() => this.ngControl()?.name + '' || '');

  constructor() { }
}
