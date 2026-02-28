import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '@components/input.component';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { FormComponent } from "@components/form.component";

export interface SupportForm {
    name: FormControl<string>;
    email: FormControl<string>;
    query: FormControl<string>;
    phone: FormControl<string>;
}

@Component({
    imports: [ReactiveFormsModule, InputComponent, InputGroupModule, ButtonModule, InputTextModule, FormComponent],
    selector: 'app-support',
    standalone: true,
    template: ` 
    <div class="max-w-2xl">
        <app-form styleClass="gap-5"  header="Contact Support" (formSubmit)="onFormSubmit()" [formGroup]="supportForm">
            <app-input icon="pi-user">
                <input pInputText name="name" placeholder="Enter your full name" type="text" formControlName="name" />
            </app-input>
            <app-input icon="pi-envelope">
                <input pInputText name="email" placeholder="Enter your email address" type="email" formControlName="email" />
            </app-input>
            <app-input icon="pi-phone">
                <input pInputText name="phone" placeholder="Enter your phone number" type="tel" formControlName="phone" />
            </app-input>
            <app-input iconStyleClass="items-start pt-4" icon="pi-comment">
                <textarea pInputText name="query" placeholder="Describe your question or issue in detail..." formControlName="query" rows="8" style="resize: vertical; min-height: 100px;"></textarea>
            </app-input>
            <p-button #submitBtn  type="submit" label="Send Message" icon="pi pi-send" fluid ></p-button>
        </app-form>
    </div>
`,
})
export class SupportComponent {
    supportForm: FormGroup<SupportForm>;

    constructor() {
        this.supportForm = new FormGroup({
            name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
            email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
            phone: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^[+]?[1-9]\d{0,15}$/)] }),
            query: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10)] }),
        });
    }

    onFormSubmit() {
        if (this.supportForm.valid) {
     
            alert('Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
        }
    }


}
