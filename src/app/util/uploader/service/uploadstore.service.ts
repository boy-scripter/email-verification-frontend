import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { createFileAdvanced, UploadableFile } from '../classes';
import { UploadStrategyFactory, UploadStrategyType } from '../stratergy-factory';

export type UploadStatus = 'idle' | 'uploading' | 'completed' | 'error';
export interface UploadItemState {
  file: UploadableFile;
  count: number;
  status: UploadStatus;
}

export interface AddNewFile {
  key: string;
  rawFile: File;
  mediaCode: string;
  strategyName: UploadStrategyType;
}

@Injectable({ providedIn: 'root' })
export class UploadStoreService {
  private filesMap = new Map<string, WritableSignal<UploadItemState>>();
  private uploadStrategyFactory = inject(UploadStrategyFactory);
  readonly files = computed(() => this.filesMap);

  // -----------------------
  // Add file
  // -----------------------
  addFile({ key, rawFile, mediaCode, strategyName }: AddNewFile) {
    const advanced = createFileAdvanced(rawFile);
    const uploadable = new UploadableFile(advanced, mediaCode);
    const strategy = this.uploadStrategyFactory.getStrategy(strategyName);
    uploadable.setStrategy(strategy);
    this.filesMap.set(
      key,
      signal({
        file: uploadable,
        count: 0,
        status: 'idle',
      }),
    );
  }

  remove(key: string) {
    this.filesMap.delete(key);
  }

  async startUpload(key: string): Promise<string> {
    const currentItem = this.filesMap.get(key);

    if (!currentItem) {
      throw new Error('File not found');
    }

    const fileId = await currentItem().file.startUpload({
      onProgress: (progress: number) => {
        currentItem.set({
          ...currentItem(),
          count: progress,
          status: 'uploading',
        });
      },
      onError: () => {
        currentItem.set({
          ...currentItem(),
          count: 0,
          status: 'error',
        });
      },
      onComplete: () => {
        this.remove(key);
        currentItem.set({
          ...currentItem(),
          count: 100,
          status: 'completed',
        });
      },
    });

    return fileId;
  }

  startAll() {
    Object.keys(this.filesMap).forEach((key) => this.startUpload(key));
  }

  get(key: string): WritableSignal<UploadItemState> {
    if (!this.filesMap.has(key)) {
      throw new Error(`${key} key not exist`);
    }
    return this.filesMap.get(key) as WritableSignal<UploadItemState>;
  }
}
