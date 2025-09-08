import { Component } from "@angular/core";
import { NgxMarqueeComponent } from '@omnedia/ngx-marquee';
import { HeadingComponent } from "@components/header.component";

@Component({
  imports: [NgxMarqueeComponent, HeadingComponent],
  selector: 'app-brand-slider',
  template: `
    <section class="w-full pt-6 px-0 pb-12 bg-theme-black">
       <app-heading title="Trusted by leading brands"></app-heading>
       <om-marquee  animationDuration="10s" >
        <ng-template>
            <div class="flex items-center gap-12">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg" alt="Disney" class="h-14 w-auto" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt="Netflix" class="h-14 w-auto" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" class="h-14 w-auto" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" alt="Spotify" class="h-14 w-auto" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" class="h-14 w-auto" />
            </div>
       </ng-template>
      </om-marquee>
    </section>
  `,


})
export class BrandSliderComponent {


}