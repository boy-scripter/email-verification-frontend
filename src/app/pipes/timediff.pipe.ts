import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeDiff',
  standalone: true,
  pure: true
})
export class TimeDiffPipe implements PipeTransform {

  transform(createdAt: string | Date, completedAt: string | Date) {

    const start = new Date(createdAt).getTime();
    const end = new Date(completedAt).getTime();

    let diffMs = end - start;
    if (diffMs < 0) diffMs = 0;

    const totalSeconds = Math.floor(diffMs / 1000);

    const fast = diffMs <= 60_000; // ⚡ condition

    // ⏱ formatting
    if (totalSeconds === 0) {
      return { text: '0s', fast };
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    let text = '';

    if (hours > 0) {
      text = minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    } else if (minutes > 0) {
      text = seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
    } else {
      text = `${seconds}s`;
    }

    return { text, fast };
  }
}