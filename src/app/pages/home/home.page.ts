import { Component } from '@angular/core';
import {
  HeroComponent,
  TickerComponent,
  WhyChooseUsComponent,
  PricingComponent,
  FooterComponent,
  BrandSliderComponent,
  FeaturesComponent,
  TestimonialsComponent,
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
export class HomePage { }
