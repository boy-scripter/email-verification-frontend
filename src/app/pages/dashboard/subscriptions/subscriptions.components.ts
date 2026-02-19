import { Component } from '@angular/core';
import { CardComponent } from '@components/index';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-subscriptions',
  imports: [CardComponent, TableModule, ButtonModule],
  template: `
    <div class="w-full">
      <div class="mb-8">
        <h1 class="text-3xl font-bold tracking-widest">Subscriptions</h1>
      </div>
      <div>
        <div class="space-x-6">
          <app-card icon="pi pi-shopping-cart" label="Subscriptions and Billing">
            <p class="text-gray-600">
              Manage your Active subscriptions, view your invoices and update your payment methods
            </p>
          </app-card>
          <div class="md:p-5">
            <p-button
              icon="pi pi-crown"
              label="Active subscription"
              severity="warn"
              size="large"
              styleClass="px-6 my-2 text-base"
              type="button"
            ></p-button>

            <p-table
              [paginator]="true"
              [rows]="5"
              [rowsPerPageOptions]="[5, 10, 20]"
              [scrollable]="true"
              [tableStyle]="{ 'min-width': '50rem' }"
              [value]="customers"
            >
              <ng-template pTemplate="header">
                <tr>
                  <th class="table-header">
                    <span class="header-text">Name</span>
                  </th>
                  <th class="table-header">
                    <span class="header-text">Country</span>
                  </th>
                  <th class="table-header">
                    <span class="header-text">Company</span>
                  </th>
                  <th class="table-header">
                    <span class="header-text">Representative</span>
                  </th>
                </tr>
              </ng-template>

              <ng-template let-customer pTemplate="body">
                <tr class="table-row">
                  <td class="table-cell">
                    <span class="cell-content">{{ customer.name }}</span>
                  </td>
                  <td class="table-cell">
                    <span class="cell-content">{{ customer.country.name }}</span>
                  </td>
                  <td class="table-cell">
                    <span class="cell-content">{{ customer.company }}</span>
                  </td>
                  <td class="table-cell">
                    <span class="cell-content">{{ customer.representative.name }}</span>
                  </td>
                </tr>
                <tr class="table-row">
                  <td class="table-cell">
                    <span class="cell-content">{{ customer.name }}</span>
                  </td>
                  <td class="table-cell">
                    <span class="cell-content">{{ customer.country.name }}</span>
                  </td>
                  <td class="table-cell">
                    <span class="cell-content">{{ customer.company }}</span>
                  </td>
                  <td class="table-cell">
                    <span class="cell-content">{{ customer.representative.name }}</span>
                  </td>
                </tr>
                <tr class="table-row">
                  <td class="table-cell">
                    <span class="cell-content">{{ customer.name }}</span>
                  </td>
                  <td class="table-cell">
                    <span class="cell-content">{{ customer.country.name }}</span>
                  </td>
                  <td class="table-cell">
                    <span class="cell-content">{{ customer.company }}</span>
                  </td>
                  <td class="table-cell">
                    <span class="cell-content">{{ customer.representative.name }}</span>
                  </td>
                </tr>
              </ng-template>
            </p-table>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SubscriptionsComponent {
  customers = [
    {
      name: 'John Doe',
      country: { name: 'United States' },
      company: 'Company A',
      representative: { name: 'John Doe' },
    },
    {
      name: 'John Doe',
      country: { name: 'United States' },
      company: 'Company A',
      representative: { name: 'John Doe' },
    },
    {
      name: 'John Doe',
      country: { name: 'United States' },
      company: 'Company A',
      representative: { name: 'John Doe' },
    },
  ];
}
