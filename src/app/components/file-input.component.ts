import { Component, AfterViewInit, contentChild, input, computed, TemplateRef, ChangeDetectionStrategy, signal, ElementRef, inject, DestroyRef } from "@angular/core";
import { NgControl } from "@angular/forms";
import { filter, tap } from "rxjs";
import { NgTemplateOutlet } from "@angular/common";
import { AvatarModule } from 'primeng/avatar'
import { errorConfigType } from "@util/error-handler";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { twMerge } from "tailwind-merge";
import { ErrorControlComponent } from "./errorcontrol/errorcontrol.component";
import { UploadStrategyFactory, UploadStrategyType } from "@util/uploader";
import { UploadableFile } from "@util/uploader/classes/uploadable";
import { createFileAdvanced, FileAdvancedBase } from "@util/uploader/classes/file";

type FILE_SUPPORTED_BACKEND = "AVTAR_IMAGE"

interface ProgressState  {
    count: number;
    status: 'idle' | 'uploading' | 'completed';
}       
@Component({
    selector: 'app-file-input',
    imports: [ErrorControlComponent, NgTemplateOutlet, AvatarModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="file-input-wrapper">

        <div [class]="computedClass()">
            <ng-container 
               *ngTemplateOutlet="(previewFileTemplate() || defaultTemplate); 
                context: { 
                    $implicit: file(), 
                    imageBadge: imageBadge() 
                }"> 
            </ng-container>
            <ng-content></ng-content>
        </div>
        
       @if(progressFileTemplate() && progressState().status === 'uploading'){
            <ng-container 
                *ngTemplateOutlet="progressFileTemplate();  
                context: {
                     $implicit: progressState()
                }
                ">
            </ng-container>
       }

        @if(ngControl()){
             <app-error-control
                [controlName]="controlName()" 
                [errorConfig]="errorConfig()"
              >
             </app-error-control>
        }

       <ng-template let-data let-imageBadge="imageBadge" #defaultTemplate>
            @if(data && data.preview()){
                <p-avatar class="mx-auto" [image]="data.preview()" size="xlarge" shape="circle" />
            } 
            @if(!data && imageBadge){
                <p-avatar class="mx-auto" [label]="imageBadge"  size="xlarge" shape="circle" />
            }
       </ng-template>
    </div>
    `,

})

export class FileInputComponent implements AfterViewInit {
    
    // injections
    elementRef = inject(ElementRef)
    destroyRef = inject(DestroyRef);
    uploadStrategyFactory = inject(UploadStrategyFactory);

    //state
    protected file = signal<FileAdvancedBase | null>(null)
    protected progressState = signal<ProgressState>({
        count: 0,
        status: 'idle'
    })

    // inputs
    mediaCode = input.required<FILE_SUPPORTED_BACKEND>()
    imageBadge = input<string>();
    uploadStrategyName = input<UploadStrategyType>('normal');
    errorConfig = input<errorConfigType>();
    styleClass = input<string>();

    // content children
    previewFileTemplate = contentChild('preview', { read: TemplateRef });
    progressFileTemplate = contentChild('progress', { read: TemplateRef });
    ngControl = contentChild.required(NgControl);
    
    //computed properties
    computedClass = computed(() => twMerge('file-box relative w-max', this.styleClass()));
    controlName = computed(() => {
        const control = this.ngControl();
        if (!control) {
            throw new Error('NgControl is required');
        }
        return control.name?.toString() || '';
    });
    
    ngAfterViewInit() {
        this.ngControl().valueChanges?.pipe(
            filter((v) => v !== null),
            takeUntilDestroyed(this.destroyRef),
            tap((file: File) => {
                const fileAdvanced = createFileAdvanced(file);
                const uploadableFile = this.createUploadableFile(fileAdvanced);
                console.log(fileAdvanced)
                this.file.set(fileAdvanced);
            })
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

    createUploadableFile(file: FileAdvancedBase): UploadableFile {
            const stratergy = this.uploadStrategyFactory.getStrategy(this.uploadStrategyName());
            const uploadableFile = new UploadableFile(file, this.mediaCode());
            uploadableFile.setStrategy(stratergy);
            uploadableFile.setProgressHandler({
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
                }
            });
        return uploadableFile;
    }

}

