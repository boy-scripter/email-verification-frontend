import { inject, Injectable } from "@angular/core";
import {  gqlGetSubscriptionMutation, GetSubscriptionMutationData, gqlGetSubscriptionsQuery } from "../graphql/generated";
import { ApolloMutationResult, ApolloService } from "@util/service/apollo/apollo.service";

@Injectable({
    providedIn: 'root'
})
export class SubscriptionService {

    private apolloService = inject(ApolloService)

    getSubscriptionPaginate(afterCursor?: string) {
        return this.apolloService.watchQuery(
            gqlGetSubscriptionsQuery({
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
