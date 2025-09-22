export type errorConfigType = Record<string, ((value?: any) => string) | string>;
export const DEFAULT_ERROR_MESSAGES: errorConfigType = {
  required: () => `This field is required.`,
  minlength: (v) => `Minimum length is ${v.requiredLength}, but got ${v.actualLength}.`,
  maxlength: (v) => `Maximum length is ${v.requiredLength}, but got ${v.actualLength}.`,
  email: 'Please enter a valid email address.',
  filesizeMin: (v) => `File is too small. Minimum size is ${v.requiredSize} bytes, but got ${v.actualSize} bytes.`,
  filesizeMax: (v) => `File is too large. Maximum size is ${v.requiredSize} bytes, but got ${v.actualSize} bytes.`,
  filetype: (v) => `Invalid file type. Allowed types: ${v.allowedTypes.join(', ')}. Got: ${v.actualType}.`,
};
