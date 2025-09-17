import { Component, inject, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Location } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [DialogModule, RouterOutlet, ButtonModule, ProgressSpinnerModule],
  template: `
    <p-dialog
       position="center"
      [visible]="displayModal()"
      (visibleChange)="displayModal.set(!!$event)"
      [draggable]="false"
      transitionOptions="300ms cubic-bezier(0, 0, 0.2, 1)"
      [modal]="true"
      [closable]="true"
      (onHide)="onClose()"
      [breakpoints]="{ '1400px': '60vw', '960px': '70vw', '740px': '99vw' }"
      [contentStyle]="{ 'max-height': '80vh', 'overflow': 'visible' }"
      [style]="{ width: '30vw' }"
      styleClass="backdrop-blur-md bg-surface-400/10  sm:p-5"
    >
      <!-- @if (loading()) {
        <div class="flex justify-center items-center py-8">
          <p-progress-spinner strokeWidth="6" fill="transparent" animationDuration=".5s" [style]="{ width: '50px', height: '50px' }" />
        </div>
      } -->

      <ng-template #header>
        <p-button (onClick)="onBack()" rounded icon="pi pi-arrow-left" > </p-button>
      </ng-template>

      <router-outlet></router-outlet>
    </p-dialog>
  `,
})
export class AuthLayoutComponent {
  private location = inject(Location);
  private router = inject(Router);

  displayModal = signal(true);

  onBack() {
    this.location.back()
  }

  onClose() {
    this.displayModal.set(false);
    this.router.navigate([{ outlets: { modal: null } }])
  }


}
