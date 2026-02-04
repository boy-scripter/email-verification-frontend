import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'countdownFormat', standalone: true })
export class CountdownFormatPipe implements PipeTransform {
  transform(seconds: number | null | undefined, hideWhenZero = false): string {
    if (seconds == null) return '';

    if (seconds <= 0) {
      return hideWhenZero ? '' : '0s';
    }

    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')} min` : `${secs}s`;
  }
}
