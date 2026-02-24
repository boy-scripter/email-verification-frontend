import { Component, input } from '@angular/core';

@Component({
  selector: 'app-circle-progress',
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.viewBox]="viewBox"
      xmlns="http://www.w3.org/2000/svg"
      style="transform: rotate(-90deg)"
    >
    <g>
      <!-- Background circle -->
      <circle
        [attr.r]="radius"
        [attr.cx]="center"
        [attr.cy]="center"
        [attr.stroke]="trackColor()"
        [attr.stroke-width]="trackWidth()"
        fill="transparent"
      ></circle>

      <!-- Progress circle -->
      <circle
        [attr.r]="radius"
        [attr.cx]="center"
        [attr.cy]="center"
        [attr.stroke]="progressColor()"
        [attr.stroke-width]="strokeWidth()"
        stroke-linecap="round"
        [attr.stroke-dasharray]="circumference"
        [attr.stroke-dashoffset]="dashOffset"
        fill="transparent"
      ></circle>

      <!-- Text -->
      <text
        [attr.x]="size() / 2"
        [attr.y]="size() / 2 + fontSize / 3"
        [attr.fill]="progressColor()"
        [attr.font-size]="fontSize"
        font-weight="bold"
        dominant-baseline="central"
        text-anchor="middle"
        alignment-baseline="middle"
        [style]="{ transformOrigin: 'center' , transform: 'rotate(90deg) translate(5px, -5px)' }"
      >
        {{ value() }}%
      </text>
    </g>
    </svg>
  `,
})
export class CircleProgressComponent {
 
  value = input(0);
  size = input(250);
  strokeWidth = input(20);
  trackWidth = input(7);
  progressColor = input('#76e5b1');
  trackColor = input('#e0e0e0');
  fontSize = 20;

  get radius(): number {
    return (this.size() / 2) - Math.max(this.strokeWidth(), this.trackWidth());
  }

  get center(): number {
    return this.size() / 2;
  }

  get circumference(): number {
    return 2 * Math.PI * this.radius;
  }

  get dashOffset(): number {
    const progress = this.value() / 100;
    return this.circumference * (1 - progress);
  }

  get viewBox(): string {
    return `0 0 ${this.size()} ${this.size()}`;
  }
}
