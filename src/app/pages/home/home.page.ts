import { Component } from '@angular/core';
import {
  BrandSliderComponent,
  FeaturesComponent,
  FooterComponent,
  HeroComponent,
  PricingCardComponent,
  TestimonialsComponent,
  TickerComponent,
  WhyChooseUsComponent,
} from './components';

@Component({
  imports: [
    HeroComponent,
    BrandSliderComponent,
    TickerComponent,
    WhyChooseUsComponent,
    FeaturesComponent,
    PricingCardComponent,
    FooterComponent,
    TestimonialsComponent,
  ],
  selector: 'app-home',
  templateUrl: './home.page.html',
})
export class HomePage {
  constructor() {}
}
