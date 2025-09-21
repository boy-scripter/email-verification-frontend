import { Component } from '@angular/core';
import {
  BrandSliderComponent,
  FeaturesComponent,
  FooterComponent,
  HeroComponent,
  PricingComponent,
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
    PricingComponent,
    FooterComponent,
    TestimonialsComponent,
  ],
  selector: 'app-home',
  templateUrl: './home.page.html',
})
export class HomePage {}
