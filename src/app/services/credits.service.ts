import { inject, Injectable } from '@angular/core';
import { ApolloMutationResult, ApolloService } from '@util/service/apollo/apollo.service';
import {
  CreditHistoryRangeMutationData,
  CreditsHistoryMutationData,
  GetTotalCreditsMutationData,
  gqlCreditHistoryRangeMutation,
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
  getCreditsHistoryRange(
    startDate: string,
    endDate: string,
  ): ApolloMutationResult<CreditHistoryRangeMutationData> {
    return this.apollo.mutate(
      gqlCreditHistoryRangeMutation({
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
