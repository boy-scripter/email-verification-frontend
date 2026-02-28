import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentage'
})
export class PercentagePipe implements PipeTransform {

  transform(total: number | null | undefined, left: number | null | undefined): number {

    if (total === null || total === undefined || total <= 0) {
      return 0;
    }

    const safeLeft = left ?? 0;
    const used = total - safeLeft;

    const percentage = (used / total) * 100;

    return Math.round(percentage);
  }

}