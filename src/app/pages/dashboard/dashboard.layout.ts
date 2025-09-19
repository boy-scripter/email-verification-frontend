import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { LogoComponent } from '@components/logo.component';
import { NgxHaloComponent } from '@omnedia/ngx-halo';


@Component({
    selector: 'app-dashboard-layout',
    imports: [RouterOutlet, MenuModule, BadgeModule, AvatarModule, LogoComponent, NgxHaloComponent, RouterLink , RouterLinkActive],
    template: `
       <div class="w-full overflow-x-hidden">
         <om-halo haloSize="600px" [interactive]="false"  class="relative w-full">
      
               <button (click)="toggleMenu()" class="flex items-center lg:hidden bg-white/50  cursor-pointer fixed top-5 animate-bounce right-5 z-50 p-3 border-white/50 border-[1px] rounded-full">
                      <i class="pi pi-bars text-2xl relative z-10"></i>
               </button>
         
                <div class="p-2 w-full flex md:flex-row sm:p-5 min-h-screen md:h-screen gap-6">
                    
                    <p-menu [model]="items" [class]="'absolute  w-full md:w-auto lg:static top-0 left-0 z-10 transition-transform duration-300 ' + (isMenuOpen() ? ' translate-y-0' : '-translate-y-full lg:translate-none') " styleClass="w-full border-white backdrop-blur-md bg-surface-500/80  border-0 md:border-2 md:bg-surface-300/10"  >
                        <!-- Brand / Logo -->
                        <ng-template #start>
                            <div class="flex justify-center gap-2 py-3 px-10">
                                <app-logo styleClass="md:text-3xl"/>
                            </div>
                           
                        </ng-template>

                        <!-- Section Headers -->
                        <ng-template #submenuheader let-item>
                            <span class="uppercase text-xs tracking-wide px-4 py-2 text-surface-200">{{ item.label }}</span>
                        </ng-template>

                        <!-- Menu Items -->
                        <ng-template #item let-item>
                            <a (click)="item.click()" [routerLink]="'/dashboard/'+item.routerLink" class="flex items-center rounded-xl px-4 py-3 cursor-pointer" routerLinkActive="bg-surface-400">
                                <i [class]="item.icon"></i>
                                <span class="ml-3">{{ item.label }}</span>
                                @if(item.badge){
                                    <p-badge class="ml-auto" [value]="item.badge"></p-badge>
                                }
                            </a>
                        </ng-template>

                        <!-- User Profile -->
                        <ng-template #end>
                            <div (click)="onProfileClick()" class="mt-auto cursor-pointer px-4 py-4 flex items-center border-t border-primary-300">
                                <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" shape="circle" size="large" class="mr-3"></p-avatar>
                                <div>
                                    <span class="font-bold block">Amy Elsner</span>
                                  
                                </div>
                            </div>
                        </ng-template>
                    </p-menu>

                    <div class="w-full border-surface-200 rounded-lg backdrop-blur-md bg-surface-400/10 md:border-2 md:flex-1 md:overflow-y-auto  p-5">
                         <router-outlet />
                    </div>
                </div>
        </om-halo>
       </div>
`
})

export class DashboardLayout {

    items = [
        { label: 'Dashboard', icon: 'pi pi-home', routerLink: 'home' },
        { label: 'Email Verification', icon: 'pi pi-envelope', routerLink: 'email-verification' },
        { label: 'Buy Credits', icon: 'pi pi-credit-card', routerLink: 'buy-credits' },
        { label: 'Subscriptions', icon: 'pi pi-wallet', routerLink: 'subscriptions' },
        { label: 'Invoices', icon: 'pi pi-file', routerLink: 'invoices' },
        { label: 'Support', icon: 'pi pi-question-circle', routerLink: 'support' },
        { label: 'Logout', icon: 'pi pi-sign-out', click: () => this.toggleMenu() }
    ];


    isMenuOpen = signal(false);
    toggleMenu() {
        this.isMenuOpen.set(!this.isMenuOpen());
    }

    onProfileClick(){

    }

}
