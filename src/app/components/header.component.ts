// heading.component.ts
import { Component, input } from '@angular/core';


@Component({
  selector: 'app-heading',
  standalone: true,
  template: `
      <div class="py-12 w-full mx-auto">
          <h1 class="text-3xl  font-semibold text-center md:text-5xl mb-5"> {{ title() }}</h1>
          <ng-content> </ng-content>
      </div>
`
})
export class HeadingComponent {
  title = input.required<string>();
}
