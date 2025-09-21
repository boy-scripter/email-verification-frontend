import { Component, viewChild, TemplateRef, AfterViewInit, contentChild, input, computed } from "@angular/core";
import { NgControl } from "@angular/forms";
import { errorConfigType } from "@util/error-handler";
import { ErrorControlComponent } from "./errorcontrol.component";


@Component({
    selector: 'app-image-input',
    imports: [ErrorControlComponent],
    template: `
    <div class="image-input-wrapper">
        <ng-content></ng-content>
            
        @if(ngControl()){
            <app-error-control [controlName]="controlName()" [errorConfig]="errorConfig()"> </app-error-control>
        }
    </div>
    `
})

export class ImageInputComponent implements AfterViewInit {

    errorConfig = input<errorConfigType>();

    // contentchild
    ngControl = contentChild(NgControl);
    controlName = computed(() => this.ngControl()?.name + '' || '');

    ngAfterViewInit() {
        // Template reference is now available
    }
}
