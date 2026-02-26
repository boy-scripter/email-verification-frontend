import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '@components/index';
import { CursorPaginationFacade } from '@util/pagination/pagination.facade';
import { TableModule } from 'primeng/table';
import { InvoiceFieldsFragment } from 'src/app/graphql/generated';
import { InvoiceService } from 'src/app/services/invoice.service';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-invoice',
  imports: [CardComponent , TableModule , DatePipe , ButtonModule],
  template: `
    <div class="w-full">
      <div class="mb-8">
        <h1 class="text-3xl font-bold tracking-widest">Billing & Invoices</h1>
      </div>
      <div>
        <div class="space-x-6 mb-8">
          <app-card icon="pi pi-file" label="Billing & Invoices">
            <p class="text-gray-600">
            View all your invoices, receipts and Billing details at one place.
            </p>
          </app-card>
        </div>
        @if(items().length){
          <p-table
            [loading]="isLoading()"
            [paginator]="true"
            [rows]="5"
            [rowsPerPageOptions]="[5, 10, 20]"
            [scrollable]="true"
            [tableStyle]="{ 'min-width': '50rem' }"
            [value]="items()"
          >
            <ng-template pTemplate="header">
              <tr>
                @for(header of headers; track header){
                  <th class="table-header">
                    <span class="header-text">{{ header }}</span>
                  </th>
                }
              </tr>
            </ng-template>

            <ng-template let-invoice pTemplate="body">
              <tr class="table-row">
                <td class="table-cell">
                  <span class="cell-content">{{ invoice.id }}</span>
                </td>
                <td class="table-cell">
                  <span class="cell-content">{{ invoice.createdAt | date: 'fullDate'  }}</span>
                </td>
                <td class="table-cell">
                  <span class="cell-content">{{ invoice.amount }}</span>
                </td>
                <td class="table-cell">
                  <span class="cell-content">{{ invoice.status }}</span>
                </td>
            </tr>
            </ng-template>
          </p-table>
        } @else {
          <app-card >
          <div class="flex text-gray-600 flex-col items-center justify-center py-8">
            <i class="pi pi-credit-card text-5xl  mb-3"></i>
            <h3 class="pl-4 mb-2 font-meduim">No Invoices Yet</h3>
            <p class=" text-center mb-4">
              <span>You haven't purchased any subscription plan yet.</span> <br>
              <span class="font-bold">Choose a plan to unlock premium features.</span>
            </p>
            <p-button
              label="View Plans"
              icon="pi pi-shopping-cart"
              severity="success"
              routerLink="/dashboard/buy-credits"
            ></p-button>
          </div>
          </app-card>
        }
      </div>
    </div>
  `,
})
export class InvoiceComponent extends CursorPaginationFacade<InvoiceFieldsFragment> implements OnInit {

  private invoiceService = inject(InvoiceService);

  public headers = ['Invoice ID', 'Date', 'Amount', 'Status'];

  ngOnInit(): void {
    this.loadPage();
  }

  protected async fetchPage(cursor?: string) {
    const { data } = await this.invoiceService.getInvoicesPaginated(cursor);

    return {
      nodes: data.getInvoices.edges.map(e => e.node),
      endCursor: data.getInvoices.pageInfo.endCursor || undefined
    };
  }


  
}
