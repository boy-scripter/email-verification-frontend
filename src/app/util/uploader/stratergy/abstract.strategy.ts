export interface UploadCallbacks {
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
  onError?: (err: Error) => void;
}

export abstract class UploadStrategy {
  abstract upload(file: File, callbacks: UploadCallbacks): void;
  abstract cancel?(): void;
}
