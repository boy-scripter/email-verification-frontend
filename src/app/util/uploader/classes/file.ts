// Base abstract class
export abstract class FileAdvancedBase {
  abstract toFile(): Promise<File>;
  abstract preview(): string;
}

// Subclass for local File
class LocalFile extends FileAdvancedBase {
  constructor(private file: File) {
    super();
  }

  async toFile(): Promise<File> {
    return this.file;
  }

  preview(): string {
    return URL.createObjectURL(this.file);
  }
}

// Subclass for remote URL
class RemoteFile extends FileAdvancedBase {
  constructor(private url: string) {
    super();
  }

  async toFile(): Promise<File> {
    const response = await fetch(this.url);
    const blob = await response.blob();
    const filename = this.url.split("/").pop() || "file";
    return new File([blob], filename, { type: blob.type });
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
