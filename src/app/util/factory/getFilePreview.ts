export function getPreviewUrl(value: File | string | null | undefined): string | null {
    if (value instanceof File) {
        const blobUrl = URL.createObjectURL(value);
        return blobUrl;
    } else if (typeof value === 'string' && value.trim() !== '') {
        return value;
    } else {
        return null;
    }
}
