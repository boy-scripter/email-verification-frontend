export type errorConfigType = Record<string, ((value?: any) => string) | string>;
export const DEFAULT_ERROR_MESSAGES: errorConfigType = {
  required: 'This field is required',
  minlength: (v) => `Minimum length is ${v.requiredLength}, but got ${v.actualLength}`,
  maxlength: (v) => `Maximum length is ${v.requiredLength}, but got ${v.actualLength}`,
  email: 'Please enter a valid email address',
};
