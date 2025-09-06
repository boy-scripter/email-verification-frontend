import { Component } from "@angular/core";
import { NgxGridpatternComponent } from "@omnedia/ngx-gridpattern";
import { NgxNumberTickerComponent } from '@omnedia/ngx-number-ticker';


@Component({
    selector: 'app-ticker',
    imports: [NgxNumberTickerComponent, NgxGridpatternComponent],
    template: `
            <div >
                 <om-gridpattern  [smallGrid]="true" styleClass="bg-gray-900"  [gradientColor]="'rgb(15, 15, 15)'">
                                    <div class="email-verifications text-2xl md:text-6xl py-10 md:py-24 flex justify-center  items-center gap-2 text-theme-white">
                                    <p class="font-bold">Over</p>
                                        <om-number-ticker styleClass="text-2xl md:text-6xl font-bold text-theme-white" [countTo]="50000" />
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 md:h-20 md:w-20 text-green-400 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" class="stroke-3 md:stroke-[5]" d="M5 13l4 4L19 7" />
                                            </svg>
                                    <p class="font-bold">emails verified!</p>
                                </div>
                </om-gridpattern>
           </div>
    `
})
export class TickerCompoenent { }