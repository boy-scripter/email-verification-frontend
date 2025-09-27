import { UploadableFile } from '@components/file-input.component';

// Assuming UploadId is a type representing the unique identifier for an uploaded file
type UploadId = string;

export async function withFileResolves<T extends object>(
  data: T,
): Promise<ReplaceUploadableFileWithUploadId<T>> {

  async function process(value: any, path: string[] = []): Promise<any> {
    if (value instanceof Blob && typeof (value as UploadableFile).startUpload === 'function') {
      const file = value as UploadableFile;
      const type = file.fileType;
      if (!type) return file;

      const uploadId = await file.startUpload(); // Upload the file and get the UploadId
      if (!uploadId) {
        throw new Error(`File at ${path.join('.')} failed to upload or didn't return uploadId.`);
      }
      
      return uploadId; // Replace the UploadableFile with its UploadId
    }

    // CASE: Array
    if (Array.isArray(value)) {
      return Promise.all(value.map((v, i) => process(v, [...path, i.toString()])));
    }

    // CASE: Object
    if (value && typeof value === 'object') {
      const result: any = {};
      for (const key of Object.keys(value)) {
        result[key] = await process(value[key], [...path, key]);
      }
      return result;
    }

    // CASE: Other types (e.g., string, number, boolean)
    return value;
  }

  return process(data);
}

type ReplaceUploadableFileWithUploadId<T> = {
  [K in keyof T]: T[K] extends UploadableFile
    ? UploadId
    : T[K] extends (infer U)[]
      ? ReplaceUploadableFileWithUploadId<U>[]
      : T[K] extends object
        ? ReplaceUploadableFileWithUploadId<T[K]>
        : T[K];
};
