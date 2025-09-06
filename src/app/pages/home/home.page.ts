
import { Component } from '@angular/core';
import { HeroComponent } from "./components/hero.component";
import { TickerCompoenent } from './components/ticker.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    imports: [HeroComponent , TickerCompoenent],
})
export class HomePage {}