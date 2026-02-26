import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardComponent } from '@components/index';
import { SubscriptionService } from '@service';
import { DatePipe } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { SubscriptionFieldsFragment } from 'src/app/graphql/generated';
import { SkeletonModule } from 'primeng/skeleton';
import { CursorPaginationFacade } from '@util/pagination/pagination.facade';

@Component({
  selector: 'app-subscriptions',
  imports: [CardComponent, TableModule, ButtonModule, ProgressBarModule, DatePipe, SkeletonModule],
  template: `
    <div class="w-full">
      <div class="mb-8">
        <h1 class="text-3xl font-bold tracking-widest">Subscriptions</h1>
      </div>
      <div>
        <div >
          <app-card icon="pi pi-shopping-cart" label="Subscriptions and Billing">
            <p class="text-gray-600">
              Manage your Active subscriptions, view your invoices and update your payment methods
            </p>
          </app-card>
          <div class="mt-8">
            <!-- <p-button
              icon="pi pi-crown"
              label="Active subscription"
              severity="warn"
              size="large"
              styleClass="px-6 my-2 text-base"
              type="button"
            ></p-button> -->

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

                <ng-template let-subscription pTemplate="body">
                  <tr class="table-row">
                    <td class="table-cell">
                      <span class="cell-content">{{ subscription.plan.name }}</span>
                    </td>
                    <td class="table-cell">
                      <p-progressBar
                        [showValue]="true"
                        [value]="(subscription.total / subscription.left)"
                        style="width: 80%;"
                      ></p-progressBar>
                    </td>
                    <td class="table-cell">
                      <span class="cell-content">{{ subscription.createdAt | date: 'fullDate'  }}</span>
                    </td>
                    <td class="table-cell">
                      <span class="cell-content">{{ subscription.status }}</span>
                    </td>
                </tr>
                </ng-template>
              </p-table>
            }
            @else {
              <app-card >
              <div class="flex text-gray-600 flex-col items-center justify-center py-8">
                <i class="pi pi-credit-card text-5xl  mb-3"></i>
                <h3 class="pl-4 mb-2 font-meduim">No Subscriptions Yet</h3>
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
      </div>
    </div>
  `,
})
export class SubscriptionsComponent
  extends CursorPaginationFacade<SubscriptionFieldsFragment>
  implements OnInit {

  private subscriptionService = inject(SubscriptionService);

  public headers = ['Plan', 'Credits', 'Status', 'Activated At'];

  ngOnInit(): void {
    this.loadPage();
  }

  protected async fetchPage(cursor?: string) {
    const { data } = await this.subscriptionService.getSubscriptionPaginate(cursor);

    return {
      nodes: data.getSubscriptions.edges.map(e => e.node),
      endCursor: data.getSubscriptions.pageInfo.endCursor || undefined
    };
  }
}