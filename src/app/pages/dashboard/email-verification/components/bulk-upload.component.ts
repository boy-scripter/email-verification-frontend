import { Component  } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { CardComponent, FileInputComponent, FileInputDirective, FormComponent, FormType } from '@components/index';
import { ButtonModule } from 'primeng/button';
import { fileSizeValidator, fileTypeValidator } from '@util/error-handler';
import { ProgressBarModule } from 'primeng/progressbar';
import { withFileResolves } from '@util/uploader/withFileResolve/withFileResolve';

export interface FileEmailVerficationForm {
    file: FormControl<string>;
}

@Component({
  selector: 'app-bulk-upload',
  standalone: true,
  imports: [CardComponent, ButtonModule, FileInputComponent, FileInputDirective , FormComponent, ReactiveFormsModule , ProgressBarModule],
  styles : `
        /* Target only mobile screens */
        @media (max-width: 500px) {
            ::ng-deep app-image-input p-button .p-button-label {
                font-size: 12px; /* smaller font on mobile */
            }
        }
  `,
  template: `
    <div class="w-full">
        <app-card icon="pi pi-upload" label="Bulk Upload">
            <p class="text-gray-600">Our accurate bulk email verifier can verify and validate email addresses in large quantities.</p>
         <app-form updateOn="change" [formGroup]="fileEmailVerficationForm" (formSubmit)="onSubmit($event)">
            <app-file-input fileType="AVTAR_IMAGE"  styleClass="min-w-full whitespace-normal sm:truncate ">
                    <input appFileInput class="my-5" name="file" formControlName="file" type="file"  />   
                    <ng-template #preview let-file>
                        <div class="py-20 md:py-36 border-2 rounded-xl border-dashed border-surface-400 p-4 gap-2 flex flex-col md:flex-row justify-center items-center">
                            @if(file){
                                <p-button icon="pi pi-file" size="small" [label]="'Selected File: ' + file.name" severity="warn" styleClass="px-6 w-36 md:w-full" type="button" ></p-button>
                            } @else() {
                               <i class="pi pi-upload text-4xl text-surface-400"></i>
                               <p class="text-gray-600 text-sm md:text-base ml-4"> Select Your File <b>OR</b><br> Drag & drop a CSV file</p>
                            }
                        </div>
                    </ng-template>
                    <ng-template #progress let-progress>
                        <div class="w-full my-2" >
                          <p-progressbar  [value]="progress.count" />
                        </div>
                    </ng-template>
                </app-file-input>
                <p-button #submitBtn styleClass="p-2 px-6" size="small" severity="info" type="submit" label="Start Upload" icon="pi pi-upload" ></p-button>
            </app-form>
        </app-card>
    </div>
  `,
})
export class BulkUploadComponent {
  
    fileEmailVerficationForm: FormGroup<FileEmailVerficationForm>;

    constructor() {
        this.fileEmailVerficationForm = new FormGroup({
            file: new FormControl('', { nonNullable: true, validators: [Validators.required, fileSizeValidator(0 ,50 * 1024 * 1024) , fileTypeValidator(['csv']) ] }),
        } );
    }
 
     onSubmit(value: FormType<typeof this.fileEmailVerficationForm>) {
        withFileResolves(value)
        .then((data) => {
            console.log(data);
            value.nextTask()
        })
     }
}
