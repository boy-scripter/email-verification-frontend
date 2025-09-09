
import { Component } from '@angular/core';
import { HeroComponent } from "./components/hero.component";
import { TickerComponent } from './components/ticker.component';
import { WhyChooseUsComponent } from "./components/why-choose-us.component";
import { PricingComponent } from './components/pricing.component';
import { FooterComponent } from "./components/footer.component";
import { BrandSliderComponent } from './components/brand-slider.component';
import { FeaturesComponent } from './components/feature.component';
import { TestimonialsComponent } from "./components/testimonial.component";


@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    imports: [
        HeroComponent, BrandSliderComponent, TickerComponent,
        WhyChooseUsComponent, FeaturesComponent, PricingComponent,
        FooterComponent, TestimonialsComponent
    ],
})
export class HomePage { }