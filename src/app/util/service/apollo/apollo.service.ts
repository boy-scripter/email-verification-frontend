import { inject, Injectable } from '@angular/core';
import {
  Apollo,
  MutationOptions,
  MutationResult,
  OperationVariables,
  QueryOptions,
  QueryResult,
} from '@apollo-orbit/angular';
import { firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApolloService {
  private apollo = inject(Apollo);

  // -------------------------
  // QUERY → PROMISE
  // -------------------------
  async query<TData = unknown, TVariables extends OperationVariables = OperationVariables>(
    options: QueryOptions<TData, TVariables>,
  ): Promise<QueryResult<TData>> {
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
    });
  }

  // -------------------------
  // MUTATION → PROMISE
  // -------------------------
  async mutate<TData = unknown, TVariables extends OperationVariables = OperationVariables>(
    options: MutationOptions<TData, TVariables>,
  ): Promise<MutationResult<TData>> {
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
    });
  }
}

type PatchData<T = unknown> = Omit<MutationResult, 'data'> & {
  data: T;
};
