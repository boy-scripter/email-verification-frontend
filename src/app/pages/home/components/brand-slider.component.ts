import { ChangeDetectionStrategy, Component } from "@angular/core";
import { HeadingComponent } from "@components/header.component";
import { NgxFastMarqueeModule } from "ngx-fast-marquee";

@Component({
  imports: [HeadingComponent, NgxFastMarqueeModule],
  selector: 'app-brand-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="w-full pt-6 px-0 pb-12 bg-surface-500">
       <app-heading title="Trusted by leading brands"></app-heading>
       <ngx-fast-marquee [speed]="250"  >
     
         
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg" alt="Disney" class="h-14 mx-6 w-auto" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt="Netflix" class="h-14 mx-6 w-auto" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" class="h-14 mx-6 w-auto" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" alt="Spotify" class="h-14 mx-6 w-auto" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" class="h-14 mx-6 w-auto" />
        
     
      </ngx-fast-marquee>
    </section>
  `,


})
export class BrandSliderComponent {


}