import { inject, Injectable } from "@angular/core";
import { GetInvoiceMutationData, gqlGetInvoicesQuery, gqlGetInvoiceMutation } from "../graphql/generated";
import { ApolloMutationResult, ApolloService } from "@util/service/apollo/apollo.service";

@Injectable({
    providedIn: 'root'
})
export class InvoiceService {

    private apolloService = inject(ApolloService)

    getInvoicesPaginated(afterCursor?: string) {
        return this.apolloService.watchQuery(
            gqlGetInvoicesQuery({
                input: {
                    sortDirection: -1,
                    sortField: 'createdAt',
                    first: 10,
                    after: afterCursor
                }
            })
        );
    }

    getInvoiceById(id: string): ApolloMutationResult<GetInvoiceMutationData> {
        return this.apolloService.mutate(
                gqlGetInvoiceMutation({
                    invoiceId: id
                })
        );
    }

}
