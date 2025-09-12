import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '@components/input.component';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { FormComponent } from "@components/form.component";

export interface LoginForm {
    email: FormControl<string>;
    password: FormControl<string>;
}

@Component({
    imports: [ReactiveFormsModule, InputComponent, InputGroupModule, ButtonModule, InputTextModule, FormComponent],
    selector: 'app-login',
    standalone: true,
    template: `
    <div>
        <app-form header="Login" [formGroup]="loginForm">
            <app-input icon="pi-user"><input pInputText name="email"  placeholder="email" type="email" formControlName="email" /> </app-input>
            <app-input icon="pi-lock"><input pInputText name="password"  placeholder="password" type="password" formControlName="password" />   </app-input>
            <p-button type="button" fluid (click)="onLogin()">Login</p-button>
        </app-form>
    </div>
`,
})
export class LoginComponent {
    loginForm: FormGroup<LoginForm>;

    private fb = inject(FormBuilder);
    constructor() {
        this.loginForm = this.fb.group({
            email: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
            password: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
        });
    }

    onLogin() {
        console.log(this.loginForm.value);
    }
}
