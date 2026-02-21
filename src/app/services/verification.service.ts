import { inject, Injectable } from '@angular/core';
import { ApolloMutationResult, ApolloService } from '@util/service/apollo/apollo.service';
import {
    BulkVerifyMutationData,
  gqlBulkVerifyMutation,
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
}
