export interface UploadCallbacks {
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
  onError?: (err: Error) => void;
}
export interface SetFileAndMediaCodeParamsI {
  file: File;
  mediaCode: string;
}

export abstract class UploadStrategy {
  abstract setFileAndMediaCode(params: SetFileAndMediaCodeParamsI): void;
  abstract setProgressHandler(callback: UploadCallbacks): void;
  abstract upload(): Promise<string>;
  abstract cancel?(): void;
}
