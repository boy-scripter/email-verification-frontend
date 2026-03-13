import { Component, input, output } from '@angular/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-infinite-scroll',
  standalone: true,
  imports: [InfiniteScrollDirective],
  template: `
    <div 
    infiniteScroll
    [infiniteScrollDistance]="scrollDistance()"
    [infiniteScrollThrottle]="scrollThrottle()"
    [scrollWindow]="scrollWindow()"
    (scrolled)="scrolled.emit()"
    [style.height]="height()"
    class="block overflow-y-auto"
    [class]="styleClass()"
    >
        <ng-content />
    </div>
  `,
})
export class AppInfiniteScrollComponent {

  height = input<string>('600px');

  scrollDistance = input<number>(2);
  styleClass = input<string>('bg-white');
  scrollThrottle = input<number>(200);
  scrollWindow = input<boolean>(false);
  infiniteScrollDisabled = input<boolean>(false);

  scrolled = output<void>();
}

//not works beaciuse hostDirectives won't work here because ngx-infinite-scroll internally uses ElementRef to detect scroll events on its host — and when applied via hostDirectives,
// import { Component, input } from '@angular/core';
// import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

// @Component({
//   selector: 'app-infinite-scroll',
//   standalone: true,
//   imports: [InfiniteScrollDirective],
//   template: `<ng-content />`,
//   hostDirectives: [
//     {
//       directive: InfiniteScrollDirective,
//       inputs: [
//         'infiniteScrollDistance: scrollDistance',
//         'infiniteScrollThrottle: scrollThrottle',
//         'scrollWindow: scrollWindow',
//         'infiniteScrollDisabled: infiniteScrollDisabled',
//       ],
//       outputs: ['scrolled'],
//     },
//   ],
//   host: {
//     style: 'overflow-y: auto; display: block;',
//     '[style.height]': 'height()',
//   },
// })
// export class AppInfiniteScrollComponent {
//   height = input<string>('600px');
//   scrollDistance = input<number>(2);
//   scrollThrottle = input<number>(200);
//   scrollWindow = input<boolean>(false);
//   infiniteScrollDisabled = input<boolean>(false);
// }

