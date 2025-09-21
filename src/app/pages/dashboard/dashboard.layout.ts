import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LogoComponent } from '@components/logo.component';
import { NgxHaloComponent } from '@omnedia/ngx-halo';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-dashboard-layout',
  imports: [
    RouterOutlet,
    MenuModule,
    BadgeModule,
    AvatarModule,
    LogoComponent,
    NgxHaloComponent,
    RouterLink,
    RouterLinkActive,
  ],
  template: `
    <div class="w-full overflow-x-hidden">
      <om-halo class="relative w-full" [interactive]="false" haloSize="600px">
        <button
          class="fixed top-5 right-5 z-50 flex animate-bounce cursor-pointer items-center rounded-full border-[1px] border-white/50 bg-white/50 p-3 lg:hidden"
          (click)="toggleMenu()"
        >
          <i class="pi pi-bars relative z-10 text-2xl"></i>
        </button>

        <div class="flex min-h-screen w-full gap-6 p-2 sm:p-5 md:h-screen md:flex-row">
          <p-menu
            [class]="
              'absolute top-0 left-0 z-10 w-full transition-transform duration-300 md:w-auto lg:static ' +
              (isMenuOpen() ? ' translate-y-0' : '-translate-y-full lg:translate-none')
            "
            [model]="items"
            styleClass="w-full border-white backdrop-blur-md bg-surface-500/80  border-0 md:border-2 md:bg-surface-300/10"
          >
            <!-- Brand / Logo -->
            <ng-template #start>
              <div class="flex justify-center gap-2 px-10 py-3">
                <app-logo styleClass="md:text-3xl" />
              </div>
            </ng-template>

            <!-- Section Headers -->
            <ng-template #submenuheader let-item>
              <span class="text-surface-200 px-4 py-2 text-xs tracking-wide uppercase">{{
                item.label
              }}</span>
            </ng-template>

            <!-- Menu Items -->
            <ng-template #item let-item>
              <a
                class="flex cursor-pointer items-center rounded-xl px-4 py-3"
                [routerLink]="'/dashboard/' + item.routerLink"
                (click)="item.click()"
                routerLinkActive="bg-surface-400"
              >
                <i [class]="item.icon"></i>
                <span class="ml-3">{{ item.label }}</span>
                @if (item.badge) {
                  <p-badge class="ml-auto" [value]="item.badge"></p-badge>
                }
              </a>
            </ng-template>

            <!-- User Profile -->
            <ng-template #end>
              <div
                class="border-primary-300 mt-auto flex cursor-pointer items-center border-t px-4 py-4"
                tabindex="0"
                (keydown)="onProfileClick()"
              >
                <p-avatar
                  class="mr-3"
                  image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"
                  shape="circle"
                  size="large"
                ></p-avatar>
                <div>
                  <span class="block font-bold">Amy Elsner</span>
                </div>
              </div>
            </ng-template>
          </p-menu>

          <div
            class="border-surface-200 bg-surface-400/10 w-full rounded-lg p-5 backdrop-blur-md md:flex-1 md:overflow-y-auto md:border-2"
          >
            <router-outlet />
          </div>
        </div>
      </om-halo>
    </div>
  `,
})
export class DashboardLayout {
  items = [
    { label: 'Dashboard', icon: 'pi pi-home', routerLink: 'home' },
    { label: 'Email Verification', icon: 'pi pi-envelope', routerLink: 'email-verification' },
    { label: 'Buy Credits', icon: 'pi pi-credit-card', routerLink: 'buy-credits' },
    { label: 'Subscriptions', icon: 'pi pi-wallet', routerLink: 'subscriptions' },
    { label: 'Invoices', icon: 'pi pi-file', routerLink: 'invoices' },
    { label: 'Support', icon: 'pi pi-question-circle', routerLink: 'support' },
    { label: 'Logout', icon: 'pi pi-sign-out', click: () => this.toggleMenu() },
  ];

  router = inject(Router)
  isMenuOpen = signal(false);
  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  onProfileClick() {
    this.router.navigate(['', { outlets: { modal: ['modal', 'dashboard', 'profile'] } }]);
  }
}
