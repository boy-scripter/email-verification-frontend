import { UploadStrategy , UploadCallbacks } from '../stratergy/abstract.strategy';
import { createFileAdvanced, FileAdvancedBase } from './file';

export class UploadableFile {
  private strategy: UploadStrategy | undefined;

  constructor(
    private file: FileAdvancedBase,
    private mediaCode: string,
  ) {}

  setStrategy(strategy: UploadStrategy) {
    this.strategy = strategy;
  }

  setProgressHandler(callback: UploadCallbacks) {
    if (!this.strategy) {
      throw new Error('No strategy set');
    }
    this.strategy.setProgressHandler(callback);
  }

  async startUpload(callback: UploadCallbacks) {
    if (!this.strategy) {
      throw new Error('No strategy set');
    }
    this.strategy.setFileAndMediaCode({
      file: await this.file.toFile(),
      mediaCode: this.mediaCode
    })
    this.strategy.setProgressHandler(callback);
    return this.strategy.upload();
  }

  async toFile(): Promise<FileAdvancedBase> {
    const file = await this.file.toFile();
    return createFileAdvanced(file);
  }
}
