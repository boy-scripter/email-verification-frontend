import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { LogoComponent } from "@components/logo.component";

interface FooterLink {
  label: string;
  url: string;
}

interface FooterConfig {
  companyName: string;
  year: number;
  links: FooterLink[];
  contactEmail: string;
  contactPhone: string;
}

@Component({
  imports: [RouterModule, ButtonModule, LogoComponent],
  selector: 'app-footer',
  standalone: true,
  styles: [`
    footer a {
      text-decoration: none;
    }
    footer a:hover {
      color: #ffffff;
    }
  `],
  template: `
    <footer class="bg-surface-500 text-gray-400 py-36 px-6">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

        <!-- Company Info -->
        <div class="text-center md:text-left">
        <div class=" mb-6">
          <app-logo ></app-logo>
          <p class="mt-4 text-sm">© {{ config.year }} {{ config.companyName }}. All rights reserved.</p>
        </div>

          <!-- PrimeNG Buttons for Login / Signup -->
          <div class="flex justify-center md:justify-start gap-3">
            <button pButton type="button" label="Login"  [routerLink]="['' , { outlets: { modal: ['auth' , 'login'] } }]"></button>
            <button pButton type="button" label="Signup"  [routerLink]="['/signup']"></button>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="text-center md:text-left">
          <h5 class="text-theme-white font-semibold mb-10">Links</h5>
          <ul class="space-y-5">
            @for( link of config.links; track $index) {
                <li>
                  <a [routerLink]="[link.url]" class="hover:text-white transition-colors">{{ link.label }}</a>
                </li>
            }  
          </ul>
        </div>

        <!-- Contact Section -->
        <div class="text-center md:text-left">
          <h5 class="text-theme-white font-semibold mb-2">Contact</h5>
          <a [href]="'mail:'+config.contactEmail" class=" block text-sm">{{ config.contactEmail }}</a>
          <a [href]="'tel:'+config.contactPhone" class=" block text-sm">{{ config.contactPhone }}</a>
        </div>

      </div>
    </footer>
  `
})
export class FooterComponent {
  config: FooterConfig = {
    companyName: 'VerifyPro',
    contactEmail: 'support@verifypro.com',
    contactPhone: '+91 8010164488',
    links: [
      { label: 'Pricing', url: '/pricing' },
      { label: 'Check Email Validation', url: '/check-email' },
      { label: 'Why Choose Us', url: '/why-choose-us' },
      { label: 'Trusted Brands', url: '/trusted-brands' },
    ],
    year: new Date().getFullYear()
  };
}

