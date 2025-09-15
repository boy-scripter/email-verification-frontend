import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '@components/input.component';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { FormComponent } from "@components/form.component";
import { RouterLink } from '@angular/router';

export interface LoginForm {
    email: FormControl<string>;
    password: FormControl<string>;
}

@Component({
    imports: [ReactiveFormsModule, InputComponent, InputGroupModule, ButtonModule, InputTextModule, FormComponent, RouterLink],
    selector: 'app-login',
    standalone: true,
    template: `
    <div>
        <app-form header="Login" (ngSubmit)="onFormSubmit()" [formGroup]="loginForm">
            <app-input icon="pi-user"><input pInputText name="email"  placeholder="email" type="email" formControlName="email" /> </app-input>
            <app-input icon="pi-lock"><input pInputText name="password"  placeholder="password" type="password" formControlName="password" />   </app-input>
            <p-button [routerLink]="['' , { outlets: { modal: ['auth' , 'forgot' ] } }]" class="ml-auto" variant="text" styleClass="bg-transparent text-sm underline " label="forgot password ?"  ></p-button>
            <p-button #submitBtn type="submit" label="Login" icon="pi pi-sign-in" fluid ></p-button>
            <p-button type="button" label="Login With Google" fluid >
                <ng-template pTemplate="icon">   
                    <div class="p-1 rounded-3xl bg-white">
                        <img src="/assets/icons/google.svg" />        
                    </div>
               </ng-template>
            </p-button><br>
            <p-button label="Don't have account ?" outlined fluid  [routerLink]="['' , { outlets: { modal: ['auth' , 'signup' ] } }]" ></p-button>
        </app-form>
    </div>
`,
})
export class LoginComponent {
    loginForm: FormGroup<LoginForm>;

    private fb = inject(FormBuilder);
    constructor() {
        this.loginForm = new FormGroup({
            email: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
            password: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
        });
    }

    onFormSubmit() {
        console.log(this.loginForm.value);
    }
}
