import { signal, computed } from '@angular/core';
import { PaginationResponse } from "@myTypes/pagination.type";
import { Observable } from 'rxjs';

const initialPaginationData : PaginationResponse<any> = {
  edges: [],
  pageInfo: {
    endCursor: null,
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: null
  }
}

export abstract class CursorPaginationFacade<T> {

  // --- state ---
  public paginationData = signal<PaginationResponse<T>>(initialPaginationData);
  public isLoading = signal<boolean>(false);

  // --- computed ---
  public nextPageCursor = computed(() => this.paginationData().pageInfo.endCursor);
  public hasNextPage = computed(() => this.nextPageCursor() !== undefined);
  public items = computed(() => this.paginationData().edges.map(edge => edge));

  // --- abstract fetchPage ---
  protected abstract fetchPage(cursor: string | undefined): Observable<PaginationResponse<T>>;

  // --- load next page ---
  public loadNextPage() {
    const cursor = this.nextPageCursor() || undefined;
    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.fetchPage(cursor).subscribe({
      next: (data) => {
        const currentEdges = this.paginationData()?.edges ?? [];
        this.paginationData.set({
          edges: [...currentEdges, ...data.edges],
          pageInfo: data.pageInfo
        });
      },
      error: () => {
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  public reset() {
    this.paginationData.set(initialPaginationData);
  }
}