import { Component  } from '@angular/core';
import {  ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { CardComponent, ImageInputComponent, FileInputDirective, FormComponent } from '@components/index';
import { ButtonModule } from 'primeng/button';
import {  fileTypeValidator } from '@util/error-handler';

export interface FileEmailVerficationForm {
    file: FormControl<string>;
}

@Component({
  selector: 'app-bulk-upload',
  standalone: true,
  imports: [CardComponent, ButtonModule, ImageInputComponent, FileInputDirective , FormComponent, ReactiveFormsModule ],
  template: `
    <div class="w-full">
        <app-card icon="pi pi-upload" label="Bulk Upload">
            <p class="text-gray-600">Our accurate bulk email verifier can verify and validate email addresses in large quantities.</p>
         <app-form updateOn="change" [formGroup]="fileEmailVerficationForm" >
            <app-image-input styleClass="min-w-full">
                    <input appFileInput class="my-5" name="file" formControlName="file" type="file"  />   
                    <ng-template let-file>
                        <div class="w-full py-20 md:py-36 border-2 rounded-xl border-dashed border-surface-400 p-4 gap-2 flex flex-col md:flex-row justify-center items-center">
                            @if(file){
                                <p-button icon="pi pi-file" size="small" [label]="'Selected File: ' + file.name" severity="warn" styleClass="px-6" type="button" ></p-button>
                            } @else() {
                               <i class="pi pi-upload text-4xl text-surface-400"></i>
                               <p class="text-gray-600 text-sm md:text-base ml-4"> Select Your File <b>OR</b><br> Drag & drop a CSV file</p>
                            }
                        </div>
                    </ng-template>
                </app-image-input>
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
            file: new FormControl('', { nonNullable: true, validators: [Validators.required, fileTypeValidator(['csv']) ] }),
        } );
    }
 

}
