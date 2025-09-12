import { Component, inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { InputComponent } from "@components/input.component";

export interface LoginForm {
    email: FormControl<string>;
    password: FormControl<string>;
}


@Component({
    imports: [ReactiveFormsModule, InputComponent],
    selector: 'app-login',
    standalone: true,
    template: `
    <div>
        <h2>Login</h2>
        <form [formGroup]="loginForm">
            <app-input> <input type="email" formControlName="email" />  </app-input>
            <app-input> <input type="password" formControlName="password" />  </app-input>
            <button type="button" (click)="onLogin()">Login</button>
        </form>
    </div>
`,
})
export class SignupComponent {
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