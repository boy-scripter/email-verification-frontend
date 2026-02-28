import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardComponent } from '@components/index';
import { PercentagePipe } from '@pipes/percentage.pipe';
import { SubscriptionService } from '@service';
import { CursorPaginationFacade } from '@util/pagination/pagination.facade';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { SubscriptionFieldsFragment } from 'src/app/graphql/generated';

@Component({
  selector: 'app-subscriptions',
  imports: [
    CardComponent,
    TableModule,
    ButtonModule,
    ProgressBarModule,
    DatePipe,
    SkeletonModule,
    RouterLink,
    PercentagePipe,
  ],
  styles: `
    .active {
      color: #ffffff;
      background-color: #22c55e; /* bright green */
    }

    .utilized {
      color: #ffffff;
      background-color: #3b82f6; /* blue */
    }
  `,
  template: `
    <div class="w-full">
      <div class="mb-8">
        <h1 class="text-3xl font-bold tracking-widest">Subscriptions</h1>
      </div>
      <div>
        <div>
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

            @if (items().length) {
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
                    @for (header of headers; track header) {
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
                      <div class="flex gap-2">
                        <p-progressBar
                          [showValue]="false"
                          [value]="subscription.left_credits | percentage : subscription.total_credits"
                          style="width: 60%;"
                        ></p-progressBar>
                        <span> {{ subscription.left_credits }} out of {{subscription.total_credits}} </span>
                      </div>
                    </td>

                    <td class="table-cell">
                      <span class="cell-content">
                        {{ subscription.createdAt | date: 'fullDate' }}
                      </span>
                    </td>
                    <td class="table-cell">
                      <span
                        class="cell-content rounded-lg p-2 px-5"
                        [class]="subscription.status.toLowerCase()"
                      >
                        {{ subscription.status }}
                      </span>
                    </td>
                  </tr>
                </ng-template>
              </p-table>
            } @else {
              <app-card>
                <div class="flex flex-col items-center justify-center py-8 text-gray-600">
                  <i class="pi pi-credit-card mb-3 text-5xl"></i>
                  <h3 class="font-meduim mb-2 pl-4">No Subscriptions Yet</h3>
                  <p class="mb-4 text-center">
                    <span>You haven't purchased any subscription plan yet.</span> <br />
                    <span class="font-bold">Choose a plan to unlock premium features.</span>
                  </p>
                  <p-button
                    icon="pi pi-shopping-cart"
                    label="View Plans"
                    routerLink="/dashboard/buy-credits"
                    severity="success"
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
  implements OnInit
{
  private subscriptionService = inject(SubscriptionService);

  public headers = ['Plan', 'Credits', 'Activated At', 'Status'];

  ngOnInit(): void {
    this.loadPage();
  }

  protected async fetchPage(cursor?: string) {
    const { data } = await this.subscriptionService.getSubscriptionPaginate(cursor);

    return {
      nodes: data.getSubscriptions.edges.map((e) => e.node),
      endCursor: data.getSubscriptions.pageInfo.endCursor || undefined,
    };
  }
}
