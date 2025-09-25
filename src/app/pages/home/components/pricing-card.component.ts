

import { Component } from "@angular/core";
import { PricingComponent } from "@components/internal";
import { NgxLightRaysComponent } from "@omnedia/ngx-light-rays";
import { HeadingComponent } from "@components/index";

@Component({
  selector: 'app-pricing-card',
  template: `
      <om-light-rays>
      <section class="relative text-white py-20 md:pb-36 px-6">
      <app-heading title="Pricing"></app-heading>
        <app-pricing></app-pricing>
      </section>
    </om-light-rays>
    `,
  imports: [NgxLightRaysComponent, PricingComponent, HeadingComponent]
})
export class PricingCardComponent {

}