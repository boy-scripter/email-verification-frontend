import { Injectable } from '@angular/core';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { enviroment } from '@env';
import { gqlRefreshTokenMutation } from '../graphql/generated';


@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly http = new HttpLink({
    uri: enviroment.gql_base_url,
  });


  private readonly apolloClient = new ApolloClient({
    link: ApolloLink.from([this.http]),
    cache: new InMemoryCache(),
  });

  async refreshToken(token: string) {
   return this.apolloClient.mutate(
      gqlRefreshTokenMutation({
        token,
      }),
    );
  }

}
