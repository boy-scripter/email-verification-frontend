import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-modal-component',
  standalone: true,
  imports: [DialogModule, ButtonModule, ProgressSpinnerModule],
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
        <ng-content select="[modalHeader]"></ng-content>
     </ng-template>

      <ng-content select="[modalBody]"></ng-content>

    </p-dialog>
  `,
})
export class ModalComponent {
  private router = inject(Router);

  displayModal = signal(true);

  onClose() {
    this.displayModal.set(false);
    this.router.navigate([{ outlets: { modal: null } }]);
  }
}
