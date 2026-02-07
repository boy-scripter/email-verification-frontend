import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent, FormComponent, RawValue } from '@components/index';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { AuthStore } from '@store/authstore'; 
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';

export interface SignupForm {
    name: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
}

@Component({
    imports: [ReactiveFormsModule, InputComponent, InputGroupModule, ButtonModule, InputTextModule, FormComponent, RouterLink],
    selector: 'app-login',
    standalone: true,
    template: `
    <div>
        <app-form header="Signup" (formSubmit)="onFormSubmit($event)" [formGroup]="signupForm">
            <app-input icon="pi-user"><input pInputText name="name"  placeholder="name" type="text" formControlName="name" />   </app-input>
            <app-input icon="pi-envelope"><input pInputText name="email"  placeholder="email" type="email" formControlName="email" /> </app-input>
            <app-input icon="pi-lock"><input pInputText name="password"  placeholder="password" type="password" formControlName="password" />   </app-input>
             <p-button #submitBtn type="submit" label="Signup" icon="pi pi-user-plus" fluid ></p-button>
             <p-button type="button" label="Signup With Google" icon="pi pi-google" fluid >
               <ng-template pTemplate="icon">   
                    <div class="p-1 rounded-3xl bg-white">
                        <img src="/assets/icons/google.svg" alt="google-login"/>        
                    </div>
               </ng-template>
            </p-button> <br>
            <p-button label="Already Have account ?" [outlined]="true" fluid  [routerLink]="['' , { outlets: { modal: ['modal','auth' , 'login' ] } }]"  ></p-button>
        </app-form>
    </div>
`})
export class SignupComponent {
    signupForm: FormGroup<SignupForm>;

    private authStore = inject(AuthStore);
    private fb = inject(FormBuilder);
    
    constructor() {
        this.signupForm = new FormGroup({
            name: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
            email: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
            password: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
        }, { updateOn: 'change' });
    }

    async onFormSubmit(value: RawValue<typeof this.signupForm>) {
       await this.authStore.register(value.email, value.password, value.name);
       
    }
}

