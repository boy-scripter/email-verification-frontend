import { inject, Injectable } from '@angular/core';
import {
  Apollo,
  MutationOptions,
  MutationResult,
  OperationVariables,
  QueryOptions,
  QueryResult,
  WatchQueryOptions,
  WatchQueryResult,
} from '@apollo-orbit/angular';
import { firstValueFrom, map, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class ApolloService {
  private apollo = inject(Apollo);

  // -------------------------
  // WATCH QUERY → PROMISE
  // -------------------------
  watchQuery<TData = unknown, TVariables extends OperationVariables = OperationVariables>(
    options: WatchQueryOptions<TData, TVariables>,
  ): ApolloWatchQueryResult<TData> {
    return this.apollo.watchQuery<TData, TVariables>(options)
  }

  // -------------------------
  // QUERY → PROMISE
  // -------------------------
  async query<TData = unknown, TVariables extends OperationVariables = OperationVariables>(
    options: QueryOptions<TData, TVariables>,
  ): ApolloQueryResult<TData> {
    return firstValueFrom(
      this.apollo.query<TData, TVariables>(options).pipe(
        map((result) => {
          if (!result || !result.data) {
            throw new Error('result.data is null or undefined');
          }
          return result;
        }),
      ),
    ).catch((error) => {
      console.error('Apollo Query Error:', error);
      console.log('Query Options:', options);
      throw error;
    }) as Promise<PatchedQueryResult<TData>>;
  }

  // -------------------------
  // MUTATION → PROMISE
  // -------------------------
  async mutate<TData = unknown, TVariables extends OperationVariables = OperationVariables>(
    options: MutationOptions<TData, TVariables>,
  ): ApolloMutationResult<TData> {
    return firstValueFrom(
      this.apollo.mutate<TData, TVariables>(options).pipe(
        map((result) => {
          if (!result || !result.data) {
            throw new Error('result.data is null or undefined');
          }
          return result;
        }),
      ),
    ).catch((error) => {
      console.error('Apollo Mutation Error:', error);
      console.log('Mutation Options:', options);
      throw error;
    }) as Promise<PatchedMutationResult<TData>>;
  }
}



// we have discarded the data property from the result type because it has also undefined signature type like data | undeifned  but after patched  only data
type PatchData<
  ResultType extends MutationResult<TData> | QueryResult<TData> | WatchQueryResult<TData>,
  TData = unknown,
> = Omit<ResultType, 'data'> & {
  data: TData;
};

type PatchedMutationResult<TData = unknown> = PatchData<MutationResult<TData>, TData>;
type PatchedQueryResult<TData = unknown> = PatchData<QueryResult<TData>, TData>;

export type ApolloMutationResult<TData = unknown> = Promise<PatchData<MutationResult<TData>, TData>>;
export type ApolloQueryResult<TData = unknown> = Promise<PatchData<QueryResult<TData>, TData>>;
export type ApolloWatchQueryResult<TData = unknown> = Observable<QueryResult<TData>>;