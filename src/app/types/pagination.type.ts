import { PageInfo } from "../graphql/generated";

export interface PaginationResponse<T = any> {
  __typename?: string;
  edges: T[];
  pageInfo: PageInfo;
}