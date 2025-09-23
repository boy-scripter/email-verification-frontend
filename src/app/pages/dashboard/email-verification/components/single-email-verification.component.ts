import { Component } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { Card } from "primeng/card";

@Component({
  selector: 'app-single-email-verification',
  imports: [InputTextModule, ButtonModule, Card],
  template: `
<p-card class="shadow-lg backdrop-blur-xl bg-white/10 border border-white/20">
  <div class="p-6 bg-white/95 rounded-lg">
    <div class="flex items-center gap-2 mb-4">
      <i class="pi pi-envelope text-blue-600 text-xl"></i>
      <h2 class="text-xl font-bold text-gray-800">Email Verification</h2>
    </div>
    
    <p class="text-gray-600 mb-6 text-sm">
      Verify email accuracy and deliverability. Check single addresses or upload multiple.
    </p>
    
    <div class="flex gap-1">
      <input pInputText type="email" placeholder="Enter email address" class=" px-3 py-2 rounded-lg rounded-r-none  border-gray-200 " >
      <p-button label="Verify" severity="success" styleClass="px-10  rounded-l-none" ></p-button>
    </div>
    
    
  </div>
</p-card>
  `
})
export class SingleEmailVerificationComponent { }