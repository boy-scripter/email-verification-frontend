export function required<T>(value: T | null | undefined): T {
  if (!value) throw new Error('Auth tokens missing in response');
  return value;
}
