import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CommonModule, Location } from '@angular/common';
import {  RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-modal-layout',
  standalone: true,
  imports: [DialogModule,RouterOutlet , ButtonModule],
  template: `
    <p-dialog
      [(visible)]="displayModal"
      [modal]="true"
      [closable]="true"
      (onHide)="closeModal()"
      [style]="{ width: '400px' }"
    >
      <router-outlet></router-outlet>
    </p-dialog>
  `
})
export class ModalLayoutComponent {
  displayModal: boolean = true;
  constructor(private location: Location) { }

  closeModal() {
    this.location.back()
  }
}
