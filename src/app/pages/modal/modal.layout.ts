import { Component, inject } from '@angular/core';
import { ModalComponent } from './modal.component';
import { RouterOutlet } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-modal-layout',
  standalone: true,
  imports: [ RouterOutlet, ButtonModule, ModalComponent],
  template: `
    <app-modal-component #modal (closed)="onClose()">
      <ng-container modalHeader>
        <p-button (onClick)="onBack()" icon="pi pi-arrow-left" rounded></p-button>
      </ng-container>

      <ng-container modalBody>
        <router-outlet></router-outlet>
      </ng-container>
    </app-modal-component>
  `,
})
export class ModalLayoutComponent {
  private location = inject(Location);
  private router = inject(Router);

  onBack() {
    this.location.back();
  }

  onClose() {
    this.router.navigate([{ outlets: { modal: null } }]);
  }
}