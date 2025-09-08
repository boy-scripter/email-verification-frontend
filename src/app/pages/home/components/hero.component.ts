import { Component } from "@angular/core";
import { NgxGridpatternComponent } from '@omnedia/ngx-gridpattern';
import { NgxSpotlightComponent } from '@omnedia/ngx-spotlight';
import { NgxAuroraComponent } from '@omnedia/ngx-aurora';
import { NgxTypewriterComponent } from '@omnedia/ngx-typewriter';
import { NgxNeonUnderlineComponent } from '@omnedia/ngx-neon-underline';

@Component({
  selector: 'app-hero',
  imports: [NgxGridpatternComponent, NgxSpotlightComponent, NgxNeonUnderlineComponent, NgxAuroraComponent, NgxTypewriterComponent],
  template: `
     <div class="relative  w-full h-[calc(100vh-20vh)] md:h-screen ">
      <om-gridpattern [gradientColor]="'rgb(10,10,10)'"  [gridColor]="'rgba(255, 255, 255, 0.1)'">
        <om-aurora styleClass="hero-aurora" [invert]="false">
          <om-spotlight>
            <div class="flex h-full w-full items-center justify-center p-6 ">
              <div class="hero-content max-w-3xl text-center space-y-6">
                <h1 class="text-4xl md:text-6xl font-extrabold leading-tight text-white">
                  Instantly verify <br class="hidden md:inline-block" /> any email address
                </h1>
                <om-neon-underline></om-neon-underline>
                <h2 class="text-4xl md:text-6xl font-bold flex justify-center pt-4">
                  <om-typewriter
                    styleClass="typewriter"
                    [writeSpeed]="200"
                    [words]="['Disposable', 'Invalid', 'Valid', 'Role-based']">
                  </om-typewriter>
                </h2>
                <p class=" font-light md:text-lg text-theme-white px-4">
                  Protect your app from fake signups and invalid emails. Our real-time email verification API
                  detects <span class="text-green-500 font-bold">valid</span>, 
                  <span class="text-red-500 font-bold">invalid</span>, 
                  <span class="text-yellow-400 font-bold">disposable</span>, 
                  <span class="text-blue-400 font-bold">role-based</span>, 
                  and <span class="text-gray-400 font-bold">non-existent</span> addresses quickly and reliably.
                </p>
              </div>
            </div>
          </om-spotlight>
        </om-aurora>
      </om-gridpattern>
    </div>
    `
})
export class HeroComponent {

  constructor() {

  }
}