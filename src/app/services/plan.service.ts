import { Injectable , inject } from "@angular/core";
import { ApolloMutationResult, ApolloService } from '@util/service/apollo/apollo.service';
import { BuyPlanMutationData, gqlBuyPlanMutation, gqlPlansQuery, PlansQueryData } from "../graphql/generated";
import { ApolloQueryResult } from "../util/service/apollo/apollo.service";

@Injectable({
    providedIn: 'root'
})
export class PlanService {

    private readonly apollo = inject(ApolloService);

    buyPlan(planId: string) : ApolloMutationResult<BuyPlanMutationData>  {
        return this.apollo.mutate(
            gqlBuyPlanMutation({
                planId
            })
        )
    }

    getPlans(): ApolloQueryResult<PlansQueryData> {
        return this.apollo.query(
           gqlPlansQuery()
        )
    }
    
}