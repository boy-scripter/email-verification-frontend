import { Component, ChangeDetectionStrategy, input, output, EventEmitter, signal } from '@angular/core';

@Component({
    selector: 'app-login-modal',
    template: `
        <div class="modal">
            <h2>Login</h2>
            <!-- <form [formGroup]="form">
                <label>
                    Email
                    <input type="email" formControlName="email" />
                </label>
                <label>
                    Password
                    <input type="password" formControlName="password" />
                </label>
                <button type="button" (click)="onLogin()">Login</button>
            </form> -->
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginModalComponent {

}