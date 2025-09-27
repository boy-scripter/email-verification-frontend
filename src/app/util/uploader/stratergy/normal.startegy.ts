import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable, tap } from 'rxjs';
import { UploadCallbacks, UploadStrategy } from './abstract.strategy';
import { setInterval } from 'timers/promises';

@Injectable({
  providedIn: 'root',
})
export class NormalUploadStrategy implements UploadStrategy {
  private http = inject(HttpClient);

  async upload(file: File, callbacks: UploadCallbacks): Promise<string> {
    try {
      // const data: any = await lastValueFrom(this.getPresignedUrl(file));
      // await lastValueFrom(
      //   this.uploadToS3({
      //     file,
      //     url: data.url,
      //     headers: data.headers,
      //     callbacks,
      //   }),
      // );
      await mockUpload(callbacks);
      return 'data.uploadId';
    } catch (err: any) {
      callbacks.onError?.(err);
      throw err;
    }
  }

  private getPresignedUrl(file: File): Observable<any> {
    return this.http.get<string>('/api/upload/presign', {
      params: {
        filename: file.name,
        contentType: file.type,
      },
    });
  }

  private uploadToS3({
    file,
    url,
    headers,
    callbacks,
  }: {
    file: File;
    url: string;
    headers: Record<string, string>;
    callbacks: UploadCallbacks;
  }) {
    return this.http
      .request('PUT', url, {
        body: file,
        headers: new HttpHeaders(headers),
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        tap((event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            const percentDone = Math.round((event.loaded / event.total) * 100);
            callbacks.onProgress?.(percentDone);
          } else if (event.type === HttpEventType.Response) {
            callbacks.onComplete?.();
          }
        }),
      );
  }
}


async function mockUpload( callbacks: UploadCallbacks) {
  const totalSteps = 10;
  for (let step = 1; step <= totalSteps; step++) {
    // simulate delay for each chunk
    console.log('Step', step);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // calculate progress percent
    const percentDone = Math.round((step / totalSteps) * 100);

    // call progress callback
    callbacks.onProgress?.(percentDone);
  }

  // call complete callback
  callbacks.onComplete?.();
}