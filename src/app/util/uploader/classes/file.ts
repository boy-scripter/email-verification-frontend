// Base abstract class
export abstract class FileAdvancedBase {
  abstract toFile(): File;
  abstract preview(): string;
}

// Subclass for local File
class LocalFile extends FileAdvancedBase {
  private cachedPreviewUrl: string | null = null;
  constructor(private file: File) {
    super();
  }

  toFile(): File {
    return this.file;
  }

 preview(): string {
    if (!this.cachedPreviewUrl) {
      this.cachedPreviewUrl = URL.createObjectURL(this.file);
    }
    return this.cachedPreviewUrl;
  }

}

// Subclass for remote URL
class RemoteFile extends FileAdvancedBase {
  constructor(private url: string) {
    super();
  }

   toFile(): File {
     throw new Error('Remote File conversion not implemented');
  }

  preview(): string {
    return this.url;
  }
}

export function createFileAdvanced(fileOrUrl: File | string): FileAdvancedBase {
  if (fileOrUrl instanceof File) {
    return new LocalFile(fileOrUrl);
  } else {
    return new RemoteFile(fileOrUrl);
  }
}
