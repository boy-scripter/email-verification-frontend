import { signal, computed } from '@angular/core';

export abstract class CursorPaginationFacade<T> {

  // state
  protected nextPageCursor = signal<string | undefined>(undefined);
  public items = signal<T[]>([]);
  public isLoading = signal<boolean>(false);

  // computed
  public hasNextPage = computed(() => this.nextPageCursor() !== undefined);

  /**
   * Must be implemented by child class
   */
  protected abstract fetchPage(cursor?: string): Promise<{
    nodes: T[];
    endCursor?: string;
  }>;

  loadPage = async () => {
    this.isLoading.set(true);

    try {
      const { nodes, endCursor } = await this.fetchPage(
        this.nextPageCursor()
      );

      this.items.set(nodes);
      this.nextPageCursor.set(endCursor);
    } finally {
      this.isLoading.set(false);
    }
  };

  reset = () => {
    this.items.set([]);
    this.nextPageCursor.set(undefined);
  };
}