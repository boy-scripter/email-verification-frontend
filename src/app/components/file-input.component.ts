import { Component, AfterViewInit, contentChild, input, computed, TemplateRef, ChangeDetectionStrategy, signal, ElementRef, inject, DestroyRef, Signal } from "@angular/core";
import { NgControl } from "@angular/forms";
import { filter, tap } from "rxjs";
import { NgTemplateOutlet } from "@angular/common";
import { errorConfigType } from "@util/error-handler";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { twMerge } from "tailwind-merge";
import { ErrorControlComponent } from "./errorcontrol/errorcontrol.component";
import { UploadStrategyType } from "@util/uploader";
import { createFileAdvanced, FileAdvancedBase } from "@util/uploader/classes/file";
import { UploadStoreService, UploadItemState } from "@util/uploader/service/uploadstore.service";

type FILE_SUPPORTED_BACKEND = "AVATAR_IMAGE" | "CSV_VERIFICATION"

@Component({
    selector: 'app-file-input',
    imports: [ErrorControlComponent, NgTemplateOutlet],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="file-input-wrapper">

        <div [class]="computedClass()">
            @if(previewFileTemplate()){
                <ng-container 
                 *ngTemplateOutlet="previewFileTemplate()
                        context: { 
                            $implicit: file()   
                        }">     
                </ng-container>
            }
            <ng-content></ng-content>
        </div>
        
       @if(progressFileTemplate()){
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
    </div>
    `,

})

export class FileInputComponent implements AfterViewInit {

    // injections
    elementRef = inject(ElementRef)
    destroyRef = inject(DestroyRef);
    uploadStoreService = inject(UploadStoreService);

    //state
    protected file = signal<FileAdvancedBase | null>(null)
    protected progressState: Signal<UploadItemState | null> = signal(null)

    // inputs
    mediaCode = input.required<FILE_SUPPORTED_BACKEND>()
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
            filter((v) => {
                const control = this.ngControl()?.control;

                const isReset =
                    control?.pristine &&
                    !control?.dirty &&
                    (v === null || v === '');

                if (isReset) {
                    this.progressState = signal(null);
                    this.file.set(null)
                    return false;
                }

                return true;
            }),
            takeUntilDestroyed(this.destroyRef),
            tap((file: File) => {
                const fileAdvanced = createFileAdvanced(file);
                this.uploadStoreService.addFile({
                    key: this.controlName(),
                    rawFile: file,
                    mediaCode: this.mediaCode(),
                    strategyName: this.uploadStrategyName()
                });
                const fileProgressState = this.uploadStoreService.get(this.controlName());
                this.progressState = computed(() => {
                    const count = fileProgressState().count;
                    if (count === 100) {
                        setTimeout(() => {
                            this.progressState = signal(null);
                        }, 3000);
                    }
                    return fileProgressState()
                });
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


}

