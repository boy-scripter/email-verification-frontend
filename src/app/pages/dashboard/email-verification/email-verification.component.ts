import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';
import { SingleEmailVerificationComponent } from './components/single-email-verification.component';
// import { BulkUploadComponent } from './components/bulk-upload.component';

@Component({
  imports: [CardModule, TabsModule, SingleEmailVerificationComponent],
  selector: 'app-email-verification',
  template: `
         <div class="w-full">
            <div class="mb-8">
              <h1 class="text-3xl font-bold tracking-widest">Email Verification</h1>
            </div>
            <div class="flex flex-col gap-6">
              <app-single-email-verification></app-single-email-verification>
            </div>
          </div>
  `
})
export class EmailVerificationComponent { }