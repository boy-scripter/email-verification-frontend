import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'countdownFormat', standalone: true })
export class CountdownFormatPipe implements PipeTransform {
  transform(seconds: number | null | undefined): string {
    if (!seconds || seconds <= 0) return '';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0
      ? `${mins}:${secs.toString().padStart(2, '0')} min`
      : `${secs}s`;
  }
}
