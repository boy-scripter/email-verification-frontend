export function getPreviewUrl(value: File | string | null | undefined): Promise<string | null> {
    return new Promise((resolve) => {
        if (value instanceof File) {
            const blobUrl = URL.createObjectURL(value);
            resolve(blobUrl);
        } else if (typeof value === 'string' && value.trim() !== '') {
            resolve(value);
        } else {
            resolve(null);
        }
    });
}
