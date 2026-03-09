import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileformat'
})
export class FileformatPipe implements PipeTransform {

  transform(bytes: number, decimals = 0): string {
    if (!bytes) return '0 bytes';

    const k = 1024;
    const sizes = ['bytes', 'kb', 'mb', 'gb', 'tb'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const value = bytes / Math.pow(k, i);
    console.log(i, value)

    return `${parseFloat(value.toFixed(decimals))} ${sizes[i]}`;
  }
}