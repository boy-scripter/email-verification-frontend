import { Injectable, inject } from '@angular/core';
import { enviroment } from '@env';
import { googleLogin } from '@util/factory';
import { ApolloService } from '@util/service/apollo/apollo.service';
import {
  gqlLoginWithEmailMutation,
  gqlLoginWithGoogleMutation,
  gqlRefreshTokenMutation,
  gqlRegisterMutation,
} from '../graphql/generated';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apollo = inject(ApolloService);

  /** Register */
  register(email: string, password: string, name: string): Promise {
    return this.apollo.mutate(
      gqlRegisterMutation({
        input: { email, password, name },
      }),
    );
  }

  /** Google Login */
  async loginWithGoogle() {
    const credential = await googleLogin(enviroment.google_auth_client_id);
    return this.apollo.mutate(
      gqlLoginWithGoogleMutation({
        input: credential,
      }),
    );
  }

  /** Email Login */
  loginWithEmail(email: string, password: string) {
    return this.apollo.mutate(
      gqlLoginWithEmailMutation({
        input: { email, password },
      }),
    );
  }

  /** Refresh Token */
  refreshToken(refreshToken: string) {
    return this.apollo.mutate(
      gqlRefreshTokenMutation({
        token: refreshToken,
      }),
    );
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
