import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApolloService } from '@util/service/apollo/apollo.service';
import { tap } from 'rxjs';
import { gqlGenerateTempUploadMutation } from 'src/app/graphql/generated';
import { UploadCallbacks, UploadStrategy } from './abstract.strategy';

@Injectable({
  providedIn: 'root',
})
export class NormalUploadStrategy implements UploadStrategy {
  private apollo = inject(ApolloService);
  private http = inject(HttpClient);

  async upload(file: File, callbacks: UploadCallbacks): Promise<string> {
    try {
      const { data } = await this.getPresignedUrl(file);
      this.uploadToS3({
        file,
        url: data.generateTempUpload.presignedData.url,
        headers: data.generateTempUpload.presignedData.headers,
        callbacks,
      });
      return data.generateTempUpload._id;
    } catch (err) {
      callbacks.onError?.(err as Error);
      throw err;
    }
  }

  private getPresignedUrl(file: File) {
    return this.apollo.mutate(
      gqlGenerateTempUploadMutation({
        input: {
          filename: file.name,
          contentType: file.type,
          mediaCode: 'test',
        },
      }),
    );
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

// async function mockUpload(callbacks: UploadCallbacks) {
//   const totalSteps = 10;

//   for (let step = 1; step <= totalSteps; step++) {
//     console.log('Step', step);
//     await new Promise((resolve) => setTimeout(resolve, 2000));
//     const percentDone = Math.round((step / totalSteps) * 100);
//     callbacks.onProgress?.(percentDone);
//   }

//   callbacks.onComplete?.();
// }
