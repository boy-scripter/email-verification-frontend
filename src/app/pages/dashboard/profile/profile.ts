import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { FormComponent, InputComponent, FileInputDirective, ImageInputComponent } from "@components/index";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";


export interface ProfileForm {
    name: FormControl<string>;
    avatar: FormControl<string | null>;
}
@Component({
    selector: 'app-profile',
    imports: [FormComponent, InputComponent, ButtonModule, InputTextModule, ReactiveFormsModule, ImageInputComponent, FileInputDirective],
    template: `
        <app-form header="Profile" [formGroup]="profileForm" (formSubmit)="onSubmit()">
        
           <app-image-input>
                <input cfileInput type="file" value="test" formControlName="avatar" />
           </app-image-input>
            <app-input icon="pi-user" >
                <input pInputText placeholder="Name" formControlName="name" />
            </app-input>
            <app-input icon="pi-envelope" >
                <input readonly pInputText placeholder="Email" value="test@gmail.com"  [disabled]='true' />
            </app-input>
            <p-button #submitBtn type="submit" label="Save" icon="pi pi-pencil" fluid ></p-button>
        </app-form>
    `,


})
export class ProfileComponent {
    profileForm: FormGroup<ProfileForm>;

    constructor() {
        this.profileForm = new FormGroup({
            name: new FormControl('', { nonNullable: true }),
            avatar: new FormControl('')
        });
    }

    onSubmit() {

    }
}
