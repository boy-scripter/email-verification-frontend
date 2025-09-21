import { Location } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { filter } from 'rxjs';

@Component({
  selector: 'app-modal-outlet',
  imports: [DialogModule, RouterOutlet, ButtonModule, ProgressSpinnerModule],
  template: `
    @if (loading()) {
      <p-dialog
        [breakpoints]="{ '1400px': '60vw', '960px': '70vw', '740px': '90vw' }"
        [closable]="true"
        [contentStyle]="{ 'max-height': '80vh', overflow: 'auto' }"
        [draggable]="false"
        [modal]="true"
        [style]="{ width: '30vw' }"
        [visible]="displayModal()"
        (onHide)="closeModal()"
        (visible)="displayModal.set(!!$event)"
        position="top"
        styleClass="backdrop-blur-md bg-surface-100/10 backdrop-blur-md p-6"
      >
        <router-outlet class="peer" name="modal"></router-outlet>
        <div class="hidden items-center justify-center py-8 peer-empty:flex">
          <p-progress-spinner
            [style]="{ width: '50px', height: '50px' }"
            animationDuration=".5s"
            fill="transparent"
            strokeWidth="6"
          />
        </div>
      </p-dialog>
    }
  `,
})
export class ModalOutlet {
  private location = inject(Location);
  private router = inject(Router);

  displayModal = signal(true);
  loading = signal(false);

  constructor() {
    this.router.events
      .pipe(
        takeUntilDestroyed(),
        filter(
          (event: Event) =>
            (event instanceof NavigationStart ||
              event instanceof NavigationEnd ||
              event instanceof NavigationCancel ||
              event instanceof NavigationError) &&
            ('url' in event ? event.url.includes('(modal:') : true),
        ),
      )
      .subscribe((event: Event) => {
        if (event instanceof NavigationStart) {
          this.loading.set(true);
        }
        if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.loading.set(false);
        }
      });
  }
  closeModal() {
    this.displayModal.set(true);
    this.location.back();
  }
}
