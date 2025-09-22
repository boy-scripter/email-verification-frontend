import { UploadableFile } from "@components/index";

interface UploadRequest {
    file: Blob;
    type: string;
}

interface UploadResponse {
    uploadId: string;
    uploadUrl: string;
    fileKey: string;
}

export async function withFileResolves(
    data: any,
): Promise<any> {
    async function process(value: UploadableFile | UploadableFile[], path: string[] = []): Promise<any> {
        if (value instanceof Blob) {
            const type = value.filetype
            if (!type) return value; // Skip if no upload type defined

            const { uploadUrl, fileKey } = await requestUpload(value, type);
            await uploadToS3(value, uploadUrl);
            return fileKey; // replace File with uploaded fileKey
        }

        if (Array.isArray(value)) {
            return Promise.all(value.map((v, i) => process(v, [...path, i.toString()])));
        }

        if (value && typeof value === 'object') {
            const result: any = {};
            for (const key of Object.keys(value)) {
                result[key] = await process(value[key], [...path, key]);
            }
            return result;
        }

        return value;
    }

    return process(data);
}

async function requestUpload(file: Blob, type: string): Promise<UploadResponse> {
    const res = await fetch('/api/uploads/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            type,
            filename: file instanceof File ? file.name : 'unnamed',
            mimeType: file.type,
            size: file.size,
        }),
    });

    if (!res.ok) throw new Error('Failed to request upload');

    return res.json(); // Should return { uploadId, uploadUrl, fileKey }
}

async function uploadToS3(file: Blob, uploadUrl: string): Promise<void> {
    const res = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
    });

    if (!res.ok) throw new Error('S3 upload failed');
}
