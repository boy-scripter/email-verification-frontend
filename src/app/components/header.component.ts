// heading.component.ts
import { Component, input } from '@angular/core';

@Component({
    selector: 'app-heading',
    standalone: true,
    template: `
    
      <h1 class="text-3xl font-semibold text-center md:text-5xl py-12">
        {{ title() }}
      </h1>
  
  `
})
export class HeadingComponent {
    title = input.required<string>();
}
