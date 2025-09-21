import { Location } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-modal-layout',
  standalone: true,
  imports: [DialogModule, RouterOutlet, ButtonModule, ProgressSpinnerModule],
  template: `
    <p-dialog
      [breakpoints]="{ '1400px': '60vw', '960px': '70vw', '740px': '99vw' }"
      [closable]="true"
      [contentStyle]="{ 'max-height': '80vh', overflow: 'visible' }"
      [draggable]="false"
      [modal]="true"
      [style]="{ width: '30vw' }"
      [visible]="displayModal()"
      (onHide)="onClose()"
      (visibleChange)="displayModal.set(!!$event)"
      position="center"
      styleClass="backdrop-blur-md bg-surface-400/10  sm:p-5"
      transitionOptions="300ms cubic-bezier(0, 0, 0.2, 1)"
    >
      <!-- @if (loading()) {
        <div class="flex justify-center items-center py-8">
          <p-progress-spinner strokeWidth="6" fill="transparent" animationDuration=".5s" [style]="{ width: '50px', height: '50px' }" />
        </div>
      } -->

      <ng-template #header>
        <p-button (onClick)="onBack()" icon="pi pi-arrow-left" rounded> </p-button>
      </ng-template>

      <router-outlet></router-outlet>
    </p-dialog>
  `,
})
export class ModalLayoutComponent {
  private location = inject(Location);
  private router = inject(Router);

  displayModal = signal(true);

  onBack() {
    this.location.back();
  }

  onClose() {
    this.displayModal.set(false);
    this.router.navigate([{ outlets: { modal: null } }]);
  }
}
