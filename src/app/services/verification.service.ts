import { inject, Injectable } from '@angular/core';
import { ApolloMutationResult, ApolloService } from '@util/service/apollo/apollo.service';
import {
  BulkVerifyMutationData,
  FileProcessingStatusMutationData,
  FileVerificationFieldsFragmentDoc,
  GET_FILE_VERIFICATIONS_QUERY,
  GetFileVerificationMutationData,
  gqlBulkVerifyMutation,
  gqlFileProcessingStatusMutation,
  gqlGetFileVerificationMutation,
  gqlGetFileVerificationsQuery,
  gqlSingleEmailMutation,
  SingleEmailMutationData,
} from '../graphql/generated';
import { getQueryFieldName } from '@util/apollo/getQueryFieldName';


@Injectable({
  providedIn: 'root',
})
export class VerificationService {
  private readonly apollo = inject(ApolloService);

  checkSingleEmail(email: string): ApolloMutationResult<SingleEmailMutationData> {
    return this.apollo.mutate(
      gqlSingleEmailMutation({
        email,
      }),
    );
  }

  bulkVerifyEmail(fileId: string): ApolloMutationResult<BulkVerifyMutationData> {
    return this.apollo.mutate({
      ...gqlBulkVerifyMutation({
        input: { fileId },
      }),
      update: (cache, { data }) => {
        const newItem = data?.bulkVerify;
        const ref = cache.writeFragment({
          data: newItem,
          fragment: FileVerificationFieldsFragmentDoc
        });
        const fieldName = getQueryFieldName(GET_FILE_VERIFICATIONS_QUERY);
        cache.modify({
          fields: {
            [fieldName](existing = {}) {
              const firstEdge = existing.edges?.[0];
              const newEdge = {
                __typename: firstEdge?.__typename,
                cursor: btoa(newItem?._id || ''),
                node: ref
              };
              return {
                ...existing,
                edges: [newEdge, ...(existing.edges || [])]
              };
            }
          }
        });
      },
    });
  }

  getFileVerifications(cursor?: string) {
    return this.apollo.watchQuery({
      ...gqlGetFileVerificationsQuery({
        input: {
          sortDirection: -1,
          sortField: 'createdAt',
          first: 10,
          after: cursor,
        },
      }),
    });
  }

  getFileVerfication(id: string): ApolloMutationResult<GetFileVerificationMutationData> {
    return this.apollo.mutate(
      gqlGetFileVerificationMutation({
        fileVerficationId: id,
      }),
    );
  }

  getFileVerificationProgress(id: string): ApolloMutationResult<FileProcessingStatusMutationData> {
    return this.apollo.mutate(
      {
        ...gqlFileProcessingStatusMutation({
          fileId: id,
        }),
        context: {
          showError: false,
        },
      }
    );
  }
}
