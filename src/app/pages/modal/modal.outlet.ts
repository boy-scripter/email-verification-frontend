import { Component, inject, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Location } from '@angular/common';
import { Router, RouterOutlet, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-modal-outlet',
    imports: [DialogModule, RouterOutlet, ButtonModule, ProgressSpinnerModule],
    template: `
            @if(loading()){
                    <p-dialog
                        position="top"
                        [visible]="displayModal()"
                        (visible)="displayModal.set(!!$event)"
                        [draggable]="false"
                        [modal]="true"
                        [closable]="true"
                        (onHide)="closeModal()"
                        [breakpoints]="{ '1400px': '60vw', '960px': '70vw', '740px': '90vw' }"
                        [contentStyle]="{ 'max-height': '80vh', 'overflow': 'auto' }"
                        [style]="{ width: '30vw' }"
                        styleClass="backdrop-blur-md bg-surface-100/10 backdrop-blur-md p-6"
                >
                
                    <router-outlet class="peer" name="modal"></router-outlet>
                    <div class=" peer-empty:flex  hidden justify-center items-center py-8">
                            <p-progress-spinner strokeWidth="6" fill="transparent" animationDuration=".5s" [style]="{ width: '50px', height: '50px' }" />
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
                filter((event: Event) =>
                    (event instanceof NavigationStart ||
                        event instanceof NavigationEnd ||
                        event instanceof NavigationCancel ||
                        event instanceof NavigationError) &&
                    ('url' in event ? event.url.includes('(modal:') : true)
                )
            )
            .subscribe((event: Event) => {
                if (event instanceof NavigationStart) { this.loading.set(true) }
                if (
                    event instanceof NavigationEnd ||
                    event instanceof NavigationCancel ||
                    event instanceof NavigationError
                ) { this.loading.set(false) }
            });
    }
    closeModal() {
        this.displayModal.set(true);
        this.location.back();
    }
}
