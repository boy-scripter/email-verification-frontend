import { inject } from '@angular/core';
import { InMemoryCache, provideApollo, withApolloOptions } from '@apollo-orbit/angular';
import { HttpLinkFactory, withHttpLink } from '@apollo-orbit/angular/http';
import { ApolloLink, Observable } from '@apollo/client';
import { ErrorLink } from '@apollo/client/link/error';
import { enviroment } from '@env';
import { TokenStore } from '@store/index';
import { MessageService } from 'primeng/api';

export const provideApolloConfig = () => {
  return provideApollo(
    withHttpLink(),
    withApolloOptions(() => {
      const httpLink = inject(HttpLinkFactory);
      const tokenStore = inject(TokenStore);
      const messageService = inject(MessageService);

      const httpLinkhandler = httpLink.create({ uri: enviroment.gql_base_url });
      const defaultOptionsContextLink = new ApolloLink((operation, forward) => {
        operation.setContext({
          showError: true, // default
          ...operation.getContext(), // allow override
        });

        return forward(operation);
      });
      const authMiddleware = new ApolloLink((operation, forward) => {
        const token = tokenStore.accessToken();

        if (!token) {
          console.warn(
            '[ACCESS_TOKEN] No token available while setting auth header. Proceeding without Authorization header.',
          );
          return forward(operation);
        }

        operation.setContext(({ headers = {} }) => ({
          headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
          },
        }));

        return forward(operation);
      });

      const errorLink = new ErrorLink(({ error, operation, forward }) => {
        const isUnauthorized = error?.message?.includes('Unauthorized');

        if (operation.getContext()['showError'] && !isUnauthorized) {
          messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message.toString(),
          });
        }

        if (!isUnauthorized) {
          console.log(
            'this request does not have have unauthoized error , so refresh token no needed',
          );
          return;
        }

        return new Observable((observer) => {
          tokenStore
            .refreshMyAccessToken()
            .then(() => {
              const token = tokenStore.accessToken();
              operation.setContext(({ headers = {} }) => ({
                headers: {
                  ...headers,
                  Authorization: `Bearer ${token}`,
                },
              }));
              forward(operation).subscribe(observer);
            })
            .catch((err) => {
              observer.error(err);
            });
        });
      });

      return {
        cache: new InMemoryCache(),
        link: ApolloLink.from([
          defaultOptionsContextLink,
          authMiddleware,
          errorLink,
          httpLinkhandler, //must be last beacuse it not returing a request like forWard(operation)
        ]),
      };
    }),
  );
};
