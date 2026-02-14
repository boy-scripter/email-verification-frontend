import { Component, AfterViewInit, contentChild, input, computed, TemplateRef, ChangeDetectionStrategy, signal, ElementRef, inject, DestroyRef } from "@angular/core";
import { NgControl } from "@angular/forms";
import { filter, tap } from "rxjs";
import { NgTemplateOutlet } from "@angular/common";
import { AvatarModule } from 'primeng/avatar'
import { errorConfigType } from "@util/error-handler";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { twMerge } from "tailwind-merge";
import { ErrorControlComponent } from "./errorcontrol/errorcontrol.component";
import { PreviewableFile } from "./forms-input/file-input.component";
import { UploadStrategyFactory, UploadStrategyType } from "@util/uploader";



type FILE_SUPPORTED_BACKEND = "AVTAR_IMAGE"
@Component({
    selector: 'app-file-input',
    imports: [ErrorControlComponent, NgTemplateOutlet, AvatarModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="file-input-wrapper">

        <div [class]="computedClass()">
            <ng-container *ngTemplateOutlet="(previewTemplate() || defaultTemplate);  context: { $implicit: file_data(), fallBack: fallBack() };"> </ng-container>
            <ng-content> </ng-content>
        </div>
        
       @if(progressTemplate() && progressState().status === 'uploading'){
        <ng-container *ngTemplateOutlet="progressTemplate();  context: { $implicit: progressState() };"> </ng-container>
       }

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

export class FileInputComponent implements AfterViewInit {


    // inputs
    fileType = input.required<FILE_SUPPORTED_BACKEND>()
    uploadStrategy = input<UploadStrategyType>('normal');
    errorConfig = input<errorConfigType>();
    fallBack = input<string>('3');

    // styling passing
    styleClass = input<string>();
    computedClass = computed(() => twMerge('file-box relative w-max', this.styleClass()));

    // content children
    previewTemplate = contentChild('preview', { read: TemplateRef });
    progressTemplate = contentChild('progress', { read: TemplateRef });
    ngControl = contentChild.required(NgControl);
    controlName = computed(() => this.ngControl().name + '');

    // injections
    elementRef = inject(ElementRef)
    destroyRef = inject(DestroyRef);
    uploadStrategyFactory = inject(UploadStrategyFactory);

    //state
    protected file_data = signal<UploadableFile | null>(null)
    protected progressState = signal<{ count: number; status: 'idle' | 'uploading' | 'completed' }>({
        count: 0,
        status: 'idle'
    })

    ngAfterViewInit() {
        // file data provider
        this.ngControl().valueChanges?.pipe(
            filter((v) => v !== null),
            takeUntilDestroyed(this.destroyRef),
            tap((v: PreviewableFile) => {
                const uploadableFile = this.toUploadableFile(v);
                this.file_data.set(uploadableFile);
            }),
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

    toUploadableFile(file: File): UploadableFile {
        const stratergy = this.uploadStrategyFactory.getStrategy(this.uploadStrategy());
        const t = Object.assign(file, {
            startUpload: () => stratergy.upload(file, {
              onProgress: (progress) => {
                    this.progressState.set({
                        count: progress,
                        status: 'uploading'
                    })
                },
              onComplete: () => {
                    this.progressState.set({
                        count: 100,
                        status: 'completed'
                    })
                },
            }),
            fileType: this.fileType()
        })
        return t;
    }
}

export interface UploadableFile extends File {
    mediaCode: FILE_SUPPORTED_BACKEND | undefined;
    startUpload: () => Promise<string>;
}