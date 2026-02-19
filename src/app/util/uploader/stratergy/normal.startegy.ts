import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApolloService } from '@util/service/apollo/apollo.service';
import { tap } from 'rxjs';
import { gqlFinalizeUploadMutation, gqlGenerateTempUploadMutation } from 'src/app/graphql/generated';
import { SetFileAndMediaCodeParamsI, UploadCallbacks, UploadStrategy } from './abstract.strategy';

@Injectable()
export class NormalUploadStrategy implements UploadStrategy {
  private apollo = inject(ApolloService);
  private http = inject(HttpClient);
  private file: File | null = null;
  private mediaCode: string | null = null;
  private callbacks: UploadCallbacks = {};

  setFileAndMediaCode(params: SetFileAndMediaCodeParamsI): void {
    this.file = params.file;
    this.mediaCode = params.mediaCode;
  }

  setProgressHandler(callbacks: UploadCallbacks): void {
    this.callbacks = callbacks;
  }

  async upload(): Promise<string> {
    this.preCheck();
    try {
     const { data } = await this.getPresignedUrl();
      await this.uploadToS3({
        file: this.file!,
        url: data.generateTempUpload.presignedData.url,
        headers: data.generateTempUpload.presignedData.headers,
      });
     const fileInfo =  await this.finalizeUpload(data.generateTempUpload._id);
      return fileInfo.data.finalizeUpload._id;
    } catch (err) {
      this.callbacks!.onError?.(err as Error);
      throw err;
    }
  }

  private getPresignedUrl() {
    return this.apollo.mutate(
      gqlGenerateTempUploadMutation({
        input: {
          filename: this.file!.name,
          contentType: this.file!.type,
          mediaCode: this.mediaCode!,
        },
      }),
    );
  }

  private uploadToS3({
    file,
    url,
    headers,
  }: {
    file: File;
    url: string;
    headers: Record<string, string>;
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
            this.callbacks!.onProgress?.(percentDone);
          } else if (event.type === HttpEventType.Response) {
            this.callbacks!.onComplete?.();
          }
        }),
      ).toPromise();
  }


  private finalizeUpload(fileId: string) {
    return this.apollo.mutate(
      gqlFinalizeUploadMutation({
        fileId,
      }),
    );
  }

  private preCheck() {
    if (!this.file) {
      throw new Error('File not set');
    }

    if (!this.mediaCode) {
      throw new Error('Media code not set');
    }

    if (!this.callbacks) {
      throw new Error('Callbacks not set');
    }
  }
}
