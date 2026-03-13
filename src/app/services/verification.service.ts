import { inject, Injectable } from '@angular/core';
import { ApolloMutationResult, ApolloService, ApolloWatchQueryResult } from '@util/service/apollo/apollo.service';
import {
  BulkVerifyMutationData,
  FileProcessingStatusMutationData,
  GetFileVerificationMutationData,
  GetFileVerificationsQueryData,
  gqlBulkVerifyMutation,
  gqlFileProcessingStatusMutation,
  gqlGetFileVerificationMutation,
  gqlGetFileVerificationsQuery,
  gqlSingleEmailMutation,
  SingleEmailMutationData,
} from '../graphql/generated';

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
    return this.apollo.mutate(
      gqlBulkVerifyMutation({
        input: {
          fileId,
        },
      }),
    );
  }

  getFileVerifications(cursor?: string) {
    return this.apollo.watchQuery<GetFileVerificationsQueryData>(
      {
        query: gqlGetFileVerificationsQuery({
          input: {
            sortDirection: -1,
            sortField: 'createdAt',
            first: 10,
            after: cursor
          }
        })
      }
    );
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
      gqlFileProcessingStatusMutation({
        fileId: id,
      }),
    );
  }
}
