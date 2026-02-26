import { inject, Injectable } from "@angular/core";
import { gqlGetSubscriptionsMutation, gqlGetSubscriptionMutation, GetSubscriptionsMutationData, GetSubscriptionMutationData } from "../graphql/generated";
import { ApolloMutationResult, ApolloService } from "@util/service/apollo/apollo.service";

@Injectable({
    providedIn: 'root'
})
export class SubscriptionService {

    private apolloService = inject(ApolloService)

    getSubscriptionPaginate(afterCursor?: string): ApolloMutationResult<GetSubscriptionsMutationData> {
        return this.apolloService.mutate(
            gqlGetSubscriptionsMutation({
                input: {
                    sortDirection: -1,
                    sortField: 'createdAt',
                    first: 10,
                    after: afterCursor
                }
            })
        );
    }

    getSubscriptionById(id: string): ApolloMutationResult<GetSubscriptionMutationData> {
        return this.apolloService.mutate(
            gqlGetSubscriptionMutation({
                    getSubscriptionId: id
            })
        );
    }

}
