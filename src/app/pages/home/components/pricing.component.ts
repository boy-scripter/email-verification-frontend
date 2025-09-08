import { Component } from "@angular/core";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";

@Component({
    selector: 'app-pricing',
    standalone: true,
    imports: [CardModule, ButtonModule],
    template: `
    <section class="relative bg-black text-white py-20 px-6">
      <h2 class="text-3xl md:text-5xl font-bold text-center mb-16">Pricing</h2>
      <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        
        <p-card header="Starter" class="rounded-2xl shadow-xl">
          <div class="text-3xl font-bold mb-6">$19<span class="text-sm">/mo</span></div>
          <ul class="text-gray-300 mb-6 space-y-2">
            <li>✔ 10,000 Verifications</li>
            <li>✔ API Access</li>
            <li>✔ Support</li>
          </ul>
          <button pButton type="button" label="Choose Plan" class="w-full p-button-rounded p-button-info"></button>
        </p-card>

        <p-card header="Pro" class="rounded-2xl shadow-xl border border-violet-500 bg-violet-900/40">
          <div class="text-3xl font-bold mb-6">$49<span class="text-sm">/mo</span></div>
          <ul class="text-gray-300 mb-6 space-y-2">
            <li>✔ 100,000 Verifications</li>
            <li>✔ API + SDK</li>
            <li>✔ Priority Support</li>
          </ul>
          <button pButton type="button" label="Choose Plan" class="w-full p-button-rounded p-button-warning"></button>
        </p-card>

        <p-card header="Enterprise" class="rounded-2xl shadow-xl">
          <div class="text-3xl font-bold mb-6">Custom</div>
          <ul class="text-gray-300 mb-6 space-y-2">
            <li>✔ Unlimited Verifications</li>
            <li>✔ Dedicated API Cluster</li>
            <li>✔ 24/7 Support</li>
          </ul>
          <button pButton type="button" label="Contact Sales" class="w-full p-button-rounded p-button-danger"></button>
        </p-card>

      </div>
    </section>
  `
})
export class PricingComponent { }
