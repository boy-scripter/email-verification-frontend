import { PageInfo } from '../graphql/generated';

export interface PaginationResponse<T> {
  edges: T[];
  pageInfo: PageInfo;
}

export type Connection<T> = T[keyof T];

export type Edge<T> =
  Connection<T> extends { edges: infer E }
    ? E extends (infer EdgeItem)[]
      ? EdgeItem
      : never
    : never;

export type Node<T> =
  Edge<T> extends { node: infer N } ? N : never;