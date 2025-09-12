import { Component, inject, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Location } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [DialogModule, RouterOutlet, ButtonModule, ProgressSpinnerModule],
  template: `
    <p-dialog
      [(visible)]="displayModal"
      position="top"
      [draggable]="false"
      [modal]="true"
      [closable]="true"
      (onHide)="closeModal()"
      [breakpoints]="{ '960px': '30vw', '740px': '90vw' }"
      [contentStyle]="{ 'max-height': '80vh', 'overflow': 'auto' }"
      [style]="{ width: '30vw' }"
      styleClass="backdrop-blur-md bg-surface-100/10 backdrop-blur-md p-6"
    >
      @if (loading()) {
        <div class="flex justify-center items-center py-8">
          <p-progress-spinner strokeWidth="6" fill="transparent" animationDuration=".5s" [style]="{ width: '50px', height: '50px' }" />
        </div>
      }

      <router-outlet
        (activate)="loading.set(false)"
        (deactivate)="loading.set(true)"
      ></router-outlet>
    </p-dialog>
  `,
})
export class AuthLayoutComponent {
  private location = inject(Location);

  displayModal = true;
  loading = signal(true); // start in loading state

  closeModal() {
    this.displayModal = false;
    this.location.back();
  }
}
