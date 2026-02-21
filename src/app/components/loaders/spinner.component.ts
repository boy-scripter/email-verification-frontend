import { Component } from '@angular/core';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [ProgressSpinner],
  template: `
    <div class="w-full flex justify-center">
      <p-progress-spinner
        strokeWidth="6"
        fill="transparent"
        animationDuration="1s"
        [style]="{ 
            width: '50px', 
            height: '50px',
            padding: '1rem'
          }"
      ></p-progress-spinner>
    </div>
  `,
})
export class SpinnerComponent {}
