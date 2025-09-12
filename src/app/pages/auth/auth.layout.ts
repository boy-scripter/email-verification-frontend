import { Component, inject } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Location } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [DialogModule, RouterOutlet, ButtonModule],
  selector: 'app-auth-layout',
  standalone: true,
  template: `
      <p-dialog  [(visible)]="displayModal" position="top"  [modal]="true"  [closable]="true" 
        (onHide)="closeModal()"
        [breakpoints]="{'960px': '30vw', '640px': '90vw'}" 
        [contentStyle]="{'max-height': '80vh', 'overflow': 'auto'}"
        [style]="{ width: '30vw' }"
        styleClass=" backdrop-blur-md bg-surface-100/10 backdrop-blur-md p-6"
      >
      <router-outlet></router-outlet>
    </p-dialog>
  `,
})
export class AuthLayoutComponent {
  private location = inject(Location);
  displayModal = true;

  closeModal() {
    this.location.back();
  }
}
