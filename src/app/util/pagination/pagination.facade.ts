import { computed, signal } from '@angular/core';
import { OperationVariables } from '@apollo/client';
import { Node, PaginationResponse } from '@myTypes/pagination.type';
import { ApolloWatchQueryResult } from '@util/service/apollo/apollo.service';
import { filter, map } from 'rxjs';
import { Exact } from 'src/app/graphql/generated';

const initialPaginationData: PaginationResponse<any> = {
  edges: [],
  pageInfo: {
    endCursor: null,
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: null,
  },
};
export abstract class CursorPaginationFacade<TData, TVariables extends Record<string, unknown> = OperationVariables> {
  // --- state ---
  public paginationData = signal<PaginationResponse<Node<TData>>>(initialPaginationData);
  public isLoading = signal<boolean>(false);

  // --- computed ---
  public nextPageCursor = computed(() => this.paginationData().pageInfo.endCursor);
  public hasNextPage = computed(() => this.nextPageCursor() !== undefined);
  public items = signal<Node<TData>[]>([])

  // --- abstract fetchPage ---
  protected abstract watchQuery(cursor?: string): ApolloWatchQueryResult<TData, Exact<{ input: TVariables; }>>;

  // --- load next page ---
  public async loadNextPage() {
    const cursor = this.nextPageCursor();
    if (!cursor) {
      throw new Error('No cursor While Loading CusrorFacade.loadNextPage()');
    };
    if (this.isLoading()) return;

    this.isLoading.set(true);
    const data = await this.watchQuery(cursor)
      .fetchMore({
        variables: {
          input: {
            after: cursor,
          } as Record<any, any>,
        },
      })
    const [key] = Object.keys(data.data!);
    const field = (data.data as any)[key];
    const edges = field.edges;
    const pageInfo = field.pageInfo;
    this.paginationData.set({
      edges: edges,
      pageInfo: pageInfo,
    });
    const items = edges.map((edge: any) => edge.node);
    this.items.set([...this.items(), ...items]);
    this.isLoading.set(false);
  }

  public loadFirstPage() {
    this.watchQuery(undefined)
      .pipe(
        filter((data) => data.data !== undefined),
        map(({ data }) => {
          const [key] = Object.keys(data!);
          const field = (data as any)[key];
          const edges = field.edges;
          const pageInfo = field.pageInfo;
          return {
            edges,
            pageInfo
          }
        })
      )
      .subscribe({
        next: (data) => {
          this.paginationData.set({
            edges: data.edges,
            pageInfo: data.pageInfo,
          });
          const items = data.edges.map((edge: any) => edge.node);
          this.items.set([...items])
          this.isLoading.set(false);
        },
        error: (error) => {
          console.log('error', error)
          this.isLoading.set(false);
        },
        complete: () => {
          console.log('complete')
          this.isLoading.set(false);
        },
      });
  }

  public reset() {
    this.paginationData.set(initialPaginationData);
  }
}
