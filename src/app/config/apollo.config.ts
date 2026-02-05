import { HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { InMemoryCache, provideApollo, withApolloOptions } from '@apollo-orbit/angular';
import { HttpLinkFactory, withHttpLink } from '@apollo-orbit/angular/http';
import { ApolloLink } from '@apollo/client';
import { ErrorLink } from '@apollo/client/link/error';
import { Observable } from '@apollo/client/utilities';
import { enviroment } from '@env';
import { AuthStore } from '@store/authstore';

export const provideApolloConfig = () => {
  const httpLink = inject(HttpLinkFactory);
  const authStore = inject(AuthStore);

  const httpLinkhandler = httpLink.create({ uri: enviroment.gql_base_url });
  const errorLink = new ErrorLink(({ error, operation, forward }) => {
    console.error('GraphQL Error:', error);

    const isUnauthorized = error?.message === 'Unauthorized';
    if (!isUnauthorized) {
      console.warn(`Non-unauthorized error on ${operation.operationName}:`, error);
      return;
    }

    console.warn(`Unauthorized on ${operation.operationName}`);
    return new Observable((observer) => {
      authStore
        .refreshMyAccessToken()
        .then(() => {
          const token = authStore.accessToken();
          operation.setContext(({ headers = {} }) => ({
            headers: {
              ...headers,
              Authorization: `Bearer ${token}`,
            },
          }));
          forward(operation).subscribe({
            next: (v) => observer.next(v),
            error: (e) => observer.error(e),
            complete: () => observer.complete(),
          });
        })
        .catch((err) => {
          console.error('[REFRESH_TOKEN] Unable to refresh a token', err);
          observer.error(err);
        });
    });
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    const token = authStore.accessToken();

    if (!token) {
      console.warn(
        '[ACCESS_TOKEN] No token available while setting auth header. Proceeding without Authorization header.',
      );
      return forward(operation);
    }

    operation.setContext({
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    });

    return forward(operation);
  });

  return provideApollo(
    withHttpLink(),
    withApolloOptions(() => ({
      cache: new InMemoryCache(),
      link: ApolloLink.from([authMiddleware, errorLink, httpLinkhandler]),
    })),
  );
};
