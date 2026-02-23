import { inject, Injectable } from '@angular/core';
import { ApolloMutationResult, ApolloService } from '@util/service/apollo/apollo.service';
import {
  CreditsByRangeMutationData,
  CreditsHistoryMutationData,
  GetTotalCreditsMutationData,
  gqlCreditsByRangeMutation,
  gqlCreditsHistoryMutation,
  gqlGetTotalCreditsMutation,
} from '../graphql/generated';

@Injectable({
  providedIn: 'root',
})
export class CreditService {
  private readonly apollo = inject(ApolloService);

  // Get credits history for a user
  getCreditsHistory(): ApolloMutationResult<CreditsHistoryMutationData> {
    return this.apollo.mutate(gqlCreditsHistoryMutation());
  }

  // Get credits by a date range
  getCreditsByRange(
    startDate: string,
    endDate: string,
  ): ApolloMutationResult<CreditsByRangeMutationData> {
    return this.apollo.mutate(
      gqlCreditsByRangeMutation({
        input: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      }),
    );
  }

  // Get total credits
  getTotalCredits(): ApolloMutationResult<GetTotalCreditsMutationData> {
    return this.apollo.mutate(gqlGetTotalCreditsMutation());
  }
}
