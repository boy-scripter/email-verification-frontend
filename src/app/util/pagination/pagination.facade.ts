import { signal, computed } from '@angular/core';

export abstract class CursorPaginationFacade<T> {

  // state
  protected nextPageCursor = signal<string | undefined>(undefined);
  public items = signal<T[]>([]);
  public isLoading = signal<boolean>(false);

  // computed
  public hasNextPage = computed(() => this.nextPageCursor() !== undefined);

  protected abstract fetchPage(cursor?: string): Promise<{
    nodes: T[];
    endCursor?: string;
  }>;

  public async loadNextPage() {
    const nextPageCursor = this.nextPageCursor();
    this.isLoading.set(true);

    try {
      const { nodes, endCursor } = await this.fetchPage(nextPageCursor);
      this.items.update(items => [...items, ...nodes]);
      this.nextPageCursor.set(endCursor);

    } finally {
      this.isLoading.set(false);
    }
  }

  public reset() {
    this.items.set([]);
    this.nextPageCursor.set(undefined);
  };
}