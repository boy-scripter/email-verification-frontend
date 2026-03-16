import { PageInfo } from '../graphql/generated';

export interface PaginationResponse<T> {
  edges: T[];
  pageInfo: PageInfo;
}
