import { Component } from "@angular/core";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { NgxBorderBeamComponent } from "@omnedia/ngx-border-beam";
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { NgTemplateOutlet } from "@angular/common";
import { FormsModule } from "@angular/forms";


interface PricingPlan {
  name: string;
  price: {
    dollar: string;
    ruppee: string;
  };
  features: string[];
  buttonLabel: string;
  buttonStyle: string;
  highlight?: boolean;
}


@Component({
  imports: [CardModule, ButtonModule, NgxBorderBeamComponent, NgTemplateOutlet, ToggleSwitchModule, FormsModule],
  selector: 'app-pricing',
  standalone: true,
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
        <div class="flex text-2xl mb-6 items-center justify-center space-x-2">
          <span>$ Dollar</span>
               <p-toggleSwitch [(ngModel)]="checked" class="p-button-outlined"></p-toggleSwitch>
          <span>₹ Inr</span>
        </div>

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
          <p-card class="rounded-2xl flex flex-col bg-transparent  h-full shadow-5xl" [header]="plan.name">
            <div class="text-3xl font-bold mb-6">
              {{ checked ? plan.price.ruppee : plan.price.dollar }}
              @if ((checked ? plan.price.ruppee : plan.price.dollar) !== 'Custom') {
                <span class="text-sm">/mo</span>
              }
            </div>

            <ul class="text-gray-300 flex-1 mb-6 space-y-2">
              @for (feature of plan.features; track $index) {
                <li> ✔ {{ feature }}</li>
              }
            </ul>

            <button pButton [label]="plan.buttonLabel" [class]="plan.buttonStyle" type="button" class="mt-auto"> </button>
          </p-card>
        </ng-template>
  `
})
export class PricingComponent {

  checked = false;


  plans: PricingPlan[] = [
    {
      buttonLabel: "Choose Plan",
      buttonStyle: "p-button-info",
      features: [
        "10,000 Verifications per month",
        "Basic API Access",
        "Bulk Upload via CSV",
        "Standard Email Validation",
        "Dashboard Analytics",
        "Community Support"
      ],
      name: "Starter",
      price: {
        dollar: "$9",
        ruppee: "₹699"
      }
    },
    {
      buttonLabel: "Choose Plan",
      buttonStyle: "p-button-warning",
      features: [
        "100,000 Verifications per month",
        "Full API + SDK Access",
        "Bulk Upload + Batch Processing",
        "Advanced Email Validation (MX, Syntax, Disposable)",
        "Priority Dashboard Analytics",
        "Priority Support",
        "Team Access & Role Management"
      ],
      highlight: true,
      name: "Pro (Recommended)",
      price: {
        dollar: "$49",
        ruppee: "₹3999"
      }
    },
    {
      buttonLabel: "Contact Sales",
      buttonStyle: "p-button-danger",
      features: [
        "Unlimited Verifications",
        "Dedicated API Cluster",
        "99.99% Uptime SLA",
        "Custom Integrations",
        "24/7 Dedicated Account Manager",
        "Advanced Security & Compliance (GDPR, SOC2)",
        "Custom Reports & White-labeling"
      ],
      name: "Enterprise",
      price: {
        dollar: "Custom",
        ruppee: "Custom"
      }
    }
  ];
}
