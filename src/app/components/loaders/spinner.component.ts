import { Component, input } from '@angular/core';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [ProgressSpinner],
  template: `
    <div class="w-full flex justify-center">
      <p-progress-spinner
        [strokeWidth]="strokeWidth()"
        [fill]="fill()"
        [animationDuration]="animationDuration()"
        [style]="{ 
            width: width(), 
            height: height(),
            padding: padding()
          }"
      ></p-progress-spinner>
    </div>
  `,
})
export class SpinnerComponent {

  width = input<string>('50px');
  height = input<string>('50px');
  padding = input<string>('1rem');
  strokeWidth = input<string>('6');
  fill = input<string>('transparent');
  animationDuration = input<string>('1s');

}
