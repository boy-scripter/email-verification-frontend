import { Component, inject } from "@angular/core";
import { Button } from 'primeng/button';
import { FormsModule } from "@angular/forms";
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from "primeng/inputtext";
import { CardComponent } from "@components/index";
import { VerificationService } from "src/app/services";
import { AsyncTaskDirective } from "@directive/asyncTask.directive";
import { EmailResultCardComponent } from "../modal/result-email.modal";

@Component({
  selector: 'app-single-email-verification',
  imports: [InputTextModule, Button, CardComponent, AsyncTaskDirective, FormsModule],

  template: `
    <app-card icon="pi pi-envelope" label="Verify Your Email">
            <p class="text-gray-600 mb-6 text-sm">
              Verify email accuracy and deliverability. Check single addresses or upload multiple.
            </p>
            <div class="flex flex-col gap-2 md:gap-0 md:flex-row md:items-center ">
              <input required #emailCtrl="ngModel" [(ngModel)]="email" pInputText type="email" placeholder="Enter email address" class=" p-3 w-full md:w-76 md:rounded-lg md:rounded-r-none border-[1px] border-gray-200" >
              <p-button [disabled]="!emailCtrl.valid" label="Verify" [appAsyncTask]="verifyEmail" severity="success" styleClass="px-10 py-3 md:rounded-l-none" ></p-button>
            </div> 
    </app-card>
  `
})
export class SingleEmailVerificationComponent {
  
  private readonly verificationService = inject(VerificationService);
  private readonly dialogService = inject(DialogService);
  protected email = '';

  verifyEmail = async () => {
     const { data } = await this.verificationService.checkSingleEmail(this.email)
     const result = data.checkEmail
     this.dialogService.open(EmailResultCardComponent, {
      data: result,
      header: 'Email Verification Result',
      modal: true,
      closable: true,
      styleClass: 'bg-black/70 px-4 w-full md:w-4/5 lg:w-3/5 xl:w-3xl'
    });
  }

 }