import { Component, computed, input } from "@angular/core";
import { CardModule } from "primeng/card";
import { twMerge } from "tailwind-merge";


@Component({
  selector: 'app-card',
  imports: [CardModule],
  template: `
     <p-card class="transparent-bg">
      <div [class]="computedStyleClass()">
        <div class="flex items-center gap-4 mb-4">
          @if(icon()){
            <i class="pi {{icon()}} text-blue-600 text-xl"></i>
          }
          <h2 class="text-xl font-bold text-gray-800">{{label()}}</h2>
        </div>
        <ng-content></ng-content>
       </div>
     </p-card>
    `
})
export class CardComponent {
  icon = input();
  label = input();
  styleClass = input<string>();

  computedStyleClass = computed(() => {
    return twMerge(
      'p-6 py-8 bg-white/95 rounded-xl',
      this.styleClass()
    );
  });

}