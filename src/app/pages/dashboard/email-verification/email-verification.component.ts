import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';
import { SingleEmailVerificationComponent , BulkUploadComponent } from './components';

@Component({
  imports: [CardModule, TabsModule, SingleEmailVerificationComponent, BulkUploadComponent],
  selector: 'app-email-verification',
  template: `
         <div class="w-full">
            <div class="mb-8">
              <h1 class="text-3xl font-bold tracking-widest">Email Verification</h1>
            </div>
            <div class="flex flex-col gap-6">
              <app-single-email-verification></app-single-email-verification>
              <app-bulk-upload></app-bulk-upload>
            </div>
          </div>
  `
})
export class EmailVerificationComponent { }