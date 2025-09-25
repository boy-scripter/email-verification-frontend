import { Component } from '@angular/core';
import { CardComponent } from '@components/index';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-invoice',
  imports: [CardComponent , TableModule],
  template: `
    <div class="w-full">
      <div class="mb-8">
        <h1 class="text-3xl font-bold tracking-widest">Billing & Invoices</h1>
      </div>
      <div>
        <div class="space-x-6">
          <app-card icon="pi pi-file" label="Billing & Invoices">
            <p class="text-gray-600">
            View all your invoices, receipts and Billing details at one place.
            </p>
          </app-card>
          
        </div>
      </div>
    </div>
  `,
})
export class InvoiceComponent {}
