import { inject, Injectable } from "@angular/core";
import {  GetInvoicesMutationData, GetInvoiceMutationData, gqlGetInvoicesMutation, gqlGetInvoiceMutation } from "../graphql/generated";
import { ApolloMutationResult, ApolloService } from "@util/service/apollo/apollo.service";

@Injectable({
    providedIn: 'root'
})
export class InvoiceService {

    private apolloService = inject(ApolloService)

    getInvoicesPaginated(afterCursor?: string): ApolloMutationResult<GetInvoicesMutationData> {
        return this.apolloService.mutate(
            gqlGetInvoicesMutation({
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
