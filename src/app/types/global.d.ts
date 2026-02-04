export {};

declare global {
  type PatchedMutationResult<T = unknown> = Omit<MutationResult, 'data'> & {
    data: T;
  };

  type MutationResult<T = unknown> = PatchedMutationResult<T>;
}
