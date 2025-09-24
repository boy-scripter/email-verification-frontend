import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { CardComponent } from "@components/index";


@Component({
  selector: 'app-single-email-verification',
  imports: [InputTextModule, ButtonModule, CardComponent],
  template: `
    <app-card icon="pi pi-envelope" label="Verify Your Email">
            <p class="text-gray-600 mb-6 text-sm">
              Verify email accuracy and deliverability. Check single addresses or upload multiple.
            </p>
            <div class="flex flex-col gap-2 md:gap-0 md:flex-row md:items-center ">
              <input pInputText type="email" placeholder="Enter email address" class=" p-3 w-full md:w-76 md:rounded-lg md:rounded-r-none border-[1px] border-gray-200 " >
              <p-button label="Verify" severity="success" styleClass="px-10 py-3 md:rounded-l-none" ></p-button>
            </div> 
    </app-card>
  `
})
export class SingleEmailVerificationComponent { }