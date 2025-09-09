import { Component } from "@angular/core";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { NgxBorderBeamComponent } from "@omnedia/ngx-border-beam";
import { HeadingComponent } from "@components/header.component";
import { NgxLightRaysComponent } from "@omnedia/ngx-light-rays";
import { NgTemplateOutlet } from "@angular/common";

interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  buttonLabel: string;
  buttonStyle: string;
  highlight?: boolean;
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CardModule, ButtonModule, NgxBorderBeamComponent, HeadingComponent, NgxLightRaysComponent, NgTemplateOutlet],
  styles: ` 
    :host ::ng-deep .p-card-body{
           height: 100%; 
      }
    :host ::ng-deep .p-card-content{
           height: 100%; 
           display: flex;
           flex-direction: column;
      }
  `,
  template: `
    <om-light-rays>
      <section class="relative text-white py-20 md:pb-36 px-6">
        <app-heading title="Pricing"> </app-heading>

        <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          @for (plan of plans; track $index) {
            
            @if (plan.highlight) {
              <om-border-beam gradientColorStart="#ffaa40" gradientColorEnd="#9c40ff" borderRadius="1rem" animationDuration="8s" class="rounded-2xl shadow-xl" >
                <ng-container *ngTemplateOutlet="cardTemplate; context: { $implicit: plan }"></ng-container>
              </om-border-beam>
            }
            @else {
              <ng-container *ngTemplateOutlet="cardTemplate; context: { $implicit: plan }"></ng-container>
            }
          }
        </div>

        <!-- Card Template -->
        <ng-template #cardTemplate let-plan>
          <p-card class="rounded-2xl flex flex-col h-full shadow-xl" [header]="plan.name">
            <div class="text-3xl font-bold mb-6">
              {{ plan.price }}
              @if (plan.price !== 'Custom') {
                <span class="text-sm">/mo</span>
              }
            </div>

            <ul class="text-gray-300 flex-1 mb-6 space-y-2">
              @for (feature of plan.features; track $index) {
                <li> ✔ {{ feature }}</li>
              }
            </ul>

            <button pButton [label]="plan.buttonLabel" [class]="plan.buttonStyle" type="button" class="mt-auto w-full" ></button>
          </p-card>
        </ng-template>
      </section>
    </om-light-rays>
  `
})
export class PricingComponent {
  plans: PricingPlan[] = [
    {
      name: "Starter",
      price: "$19",
      features: [
        "10,000 Verifications per month",
        "Basic API Access",
        "Bulk Upload via CSV",
        "Standard Email Validation",
        "Dashboard Analytics",
        "Community Support"
      ],
      buttonLabel: "Choose Plan",
      buttonStyle: "p-button-info"
    },
    {
      name: "Pro (Recommended)",
      price: "$49",
      features: [
        "100,000 Verifications per month",
        "Full API + SDK Access",
        "Bulk Upload + Batch Processing",
        "Advanced Email Validation (MX, Syntax, Disposable)",
        "Priority Dashboard Analytics",
        "Priority Support",
        "Team Access & Role Management"
      ],
      buttonLabel: "Choose Plan ",
      buttonStyle: "p-button-warning",
      highlight: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Unlimited Verifications",
        "Dedicated API Cluster",
        "99.99% Uptime SLA",
        "Custom Integrations",
        "24/7 Dedicated Account Manager",
        "Advanced Security & Compliance (GDPR, SOC2)",
        "Custom Reports & White-labeling"
      ],
      buttonLabel: "Contact Sales",
      buttonStyle: "p-button-danger"
    }
  ];
}
