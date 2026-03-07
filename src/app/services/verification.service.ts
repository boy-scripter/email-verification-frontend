import { inject, Injectable } from '@angular/core';
import { ApolloMutationResult, ApolloService } from '@util/service/apollo/apollo.service';
import {
  BulkVerifyMutationData,
  GetFileVerificationMutationData,
  GetFileVerificationsMutationData,
  gqlBulkVerifyMutation,
  gqlGetFileVerificationMutation,
  gqlGetFileVerificationsMutation,
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

  getFileVerifications(cursor?: string): ApolloMutationResult<GetFileVerificationsMutationData> {
    return this.apollo.mutate(
      gqlGetFileVerificationsMutation({
        input: {
          sortDirection: -1,
          sortField: 'createdAt',
          first: 10,
          after: cursor
        }
      })
    );
  }

  getFileVerfication(id: string): ApolloMutationResult<GetFileVerificationMutationData> {
    return this.apollo.mutate(
      gqlGetFileVerificationMutation({
        fileVerficationId: id,
      }),
    );
  }
}
