import { Component } from '@angular/core';
import { CardComponent } from '@components/index';
import { PricingComponent } from '@components/internal';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-buy-credit',
  imports: [PricingComponent, CardModule, CardComponent, Button],
  template: `
    <div class="w-full">
      <div class="mb-8">
        <h1 class="text-3xl font-bold tracking-widest">Buy Credits</h1>
      </div>
      <div>
        <div class="space-x-6">
          <app-card icon="pi pi-shopping-cart" label="Buy Credits">
            <p class="text-gray-600">
              We ensure the accuracy and deliverability of your email list. We ensure the accuracy
              and deliverability of your email list. Check one address at a time or upload multiple
              for verification. Check one address at a time or upload multiple for verification.
            </p>
          </app-card>
          <p-card class="transparent-bg md:p-6">
            <div class="flex mb-10 justify-center">
              <p-button
                icon="pi pi-credit-card"
                label="Pricing"
                severity="warn"
                size="large"
                styleClass="px-6"
                type="button"
              ></p-button>
            </div>
            <app-pricing></app-pricing>
          </p-card>
        </div>
      </div>
    </div>
  `,
})
export class BuyCreditComponent {}
