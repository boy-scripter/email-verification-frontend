import { Component, AfterViewInit, contentChild, input, computed, TemplateRef, ChangeDetectionStrategy, signal, ElementRef, inject } from "@angular/core";
import { NgControl } from "@angular/forms";
import { ErrorControlComponent } from "./errorcontrol.component";
import { from, switchMap, tap } from "rxjs";
import { NgTemplateOutlet } from "@angular/common";
import { AvatarModule } from 'primeng/avatar'
import { errorConfigType } from "@util/error-handler";
import { getPreviewUrl } from "@util/index";



@Component({
    selector: 'app-image-input',
    imports: [ErrorControlComponent, NgTemplateOutlet, AvatarModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="image-input-wrapper">

      <div class="image-box relative">
      <ng-container *ngTemplateOutlet="(templateRef() || defaultTemplate);  context: { $implicit: preview_url() };"> </ng-container>
          
          <ng-template let-previewUrl #defaultTemplate>
             <p-avatar class="mx-auto" [label]="previewUrl ? '' : 'P'" [image]="previewUrl" size="xlarge" shape="circle" />
          </ng-template>
          <ng-content> </ng-content>
      </div>

            @if(ngControl()){
                <app-error-control [controlName]="controlName()" [errorConfig]="errorConfig()"> </app-error-control>
            }
    </div>
    `
})

export class ImageInputComponent implements AfterViewInit {

    errorConfig = input<errorConfigType>();

    templateRef = contentChild(TemplateRef);
    ngControl = contentChild.required(NgControl);
    controlName = computed(() => this.ngControl()?.name + '' || '');
    preview_url = signal<string | null>(null)


    elementRef = inject(ElementRef)


    ngAfterViewInit() {
        this.ngControl().valueChanges?.pipe(
            tap((v) => console.log(v)),
            switchMap((v) => from(getPreviewUrl(v))),
            tap((v) => this.setPreview(v))
        ).subscribe();


        const wrapper = this.elementRef.nativeElement;

        const fileInput = wrapper.querySelector('input[type="file"]');
        fileInput.style.position = 'absolute';
        fileInput.style.width = '100%';
        fileInput.style.height = '100%';
        fileInput.style.top = '0%';
        fileInput.style.left = '0%';
        fileInput.style.opacity = '0';
        fileInput.style.cursor = 'pointer';
    }


    setPreview(url: string | null) {
        this.preview_url.set(url);
    }

}
