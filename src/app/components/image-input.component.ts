import { Component, AfterViewInit, contentChild, input, computed, TemplateRef, ChangeDetectionStrategy, signal, ElementRef, inject, DestroyRef } from "@angular/core";
import { NgControl } from "@angular/forms";
import { ErrorControlComponent } from "./errorcontrol/errorcontrol.component";
import {  tap } from "rxjs";
import { NgTemplateOutlet } from "@angular/common";
import { AvatarModule } from 'primeng/avatar'
import { errorConfigType } from "@util/error-handler";
import { UploadableFile } from "./forms-input/file-input.component";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { twMerge } from "tailwind-merge";

@Component({
    selector: 'app-image-input',
    imports: [ErrorControlComponent, NgTemplateOutlet, AvatarModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="image-input-wrapper">

        <div [class]="computedClass()">
            <ng-container *ngTemplateOutlet="(templateRef() || defaultTemplate);  context: { $implicit: file_data(), fallBack: fallBackImageLabel() };"> </ng-container>
            <ng-content> </ng-content>
        </div>

        @if(ngControl()){
             <app-error-control [controlName]="controlName()" [errorConfig]="errorConfig()"> </app-error-control>
        }

       <ng-template let-data let-fallback="fallBack" #defaultTemplate>
        @if(data?.preview){
            <p-avatar class="mx-auto" [image]="data?.preview" size="xlarge" shape="circle" />
        } @else {
            <p-avatar class="mx-auto" [label]="fallback"  size="xlarge" shape="circle" />
        }
        
       </ng-template>
    </div>
    `,

})

export class ImageInputComponent implements AfterViewInit {

    errorConfig = input<errorConfigType>();
    fallBackImageLabel = input<string>('3');

    styleClass = input<string>();
    computedClass = computed(() => twMerge('image-box relative w-max', this.styleClass()));

    templateRef = contentChild(TemplateRef);
    ngControl = contentChild.required(NgControl);
    controlName = computed(() => this.ngControl()?.name + '' || '');

    elementRef = inject(ElementRef)
    destroyRef = inject(DestroyRef);

   protected file_data = signal<UploadableFile | null>(null)

    ngAfterViewInit() {
        // file data provider
        this.ngControl().valueChanges?.pipe(
            takeUntilDestroyed(this.destroyRef),
            tap((v) => this.file_data.set(v)),
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



}
