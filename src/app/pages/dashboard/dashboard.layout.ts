import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { LogoComponent } from '@components/logo.component';
import { NgxHaloComponent } from '@omnedia/ngx-halo';

@Component({
    selector: 'app-dashboard-layout',
    imports: [RouterOutlet, MenuModule, BadgeModule, AvatarModule, LogoComponent, NgxHaloComponent],
    template: `
        <om-halo haloSize="500px" class="w-full">
                <div class="p-2 w-full flex sm:p-5 h-screen gap-6">
                    
                        <p-menu [model]="items" styleClass="w-full border-white  backdrop-blur-md bg-surface-300/10  "  >
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
                            <a  class="flex items-center px-4 py-3  cursor-pointer transition">
                                <i [class]="item.icon"></i>
                                <span class="ml-3">{{ item.label }}</span>
                                @if(item.badge){
                                    <p-badge class="ml-auto" [value]="item.badge"></p-badge>
                                }
                            </a>
                        </ng-template>

                        <!-- User Profile -->
                        <ng-template #end>
                            <div class="mt-auto px-4 py-4 flex items-center border-t border-primary-300">
                                <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" shape="circle" size="large" class="mr-3"></p-avatar>
                                <div>
                                    <span class="font-bold block">Amy Elsner</span>
                                    <span class="text-sm">Admin</span>
                                </div>
                            </div>
                        </ng-template>
                    </p-menu>


                    
                    <div class=" flex-1 rounded-lg backdrop-blur-md bg-surface-400/10 overflow-y-scroll  sm:p-5">
              
                    <router-outlet />
   
                </div>
                </div>
        </om-halo>
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
        { label: 'Logout', icon: 'pi pi-sign-out', routerLink: 'logout' }
    ];


}