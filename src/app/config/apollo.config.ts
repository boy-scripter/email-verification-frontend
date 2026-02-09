import { inject } from '@angular/core';
import { InMemoryCache, provideApollo, withApolloOptions } from '@apollo-orbit/angular';
import { HttpLinkFactory, withHttpLink } from '@apollo-orbit/angular/http';
import { ApolloLink, Observable } from '@apollo/client';
import { ErrorLink } from '@apollo/client/link/error';
import { enviroment } from '@env';
import { TokenStore } from '@store/index';

export const provideApolloConfig = () => {
  return provideApollo(
    withHttpLink(),
    withApolloOptions(() => {
      const httpLink = inject(HttpLinkFactory);
      const tokenStore = inject(TokenStore);

      const httpLinkhandler = httpLink.create({ uri: enviroment.gql_base_url });
      const errorLink = new ErrorLink(({ error, operation, forward }) => {
        const isUnauthorized = error?.message?.includes('Unauthorized');
        if (!isUnauthorized) {
          console.log('Not A Unauthorized Error', error);
          return;
        }

        if (operation.getContext()['alreadyRetried']) return;
        operation.setContext({ alreadyRetried: true });

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

      return {
        cache: new InMemoryCache(),
        link: ApolloLink.from([errorLink, authMiddleware, httpLinkhandler]),
      };
    }),
  );
};
