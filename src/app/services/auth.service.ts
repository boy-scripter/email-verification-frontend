import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Injectable, inject } from '@angular/core';
import { ApolloService } from '@util/service/apollo/apollo.service';
import {
  gqlLoginWithEmailMutation,
  gqlLoginWithGoogleMutation,
  gqlRegisterMutation,
} from '../graphql/generated';
import { GoogleOAuthTokenResponse } from '@components/googlebtn.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apollo = inject(ApolloService);
  private readonly socialAuth = inject(SocialAuthService);

  /** Register */
  register(email: string, password: string, name: string) {
    return this.apollo.mutate(
      gqlRegisterMutation({
        input: { email, password, name },
      }),
    );
  }

  /** Google Login */
  async loginWithGoogle(credential: GoogleOAuthTokenResponse ) {
    return this.apollo.mutate(
      gqlLoginWithGoogleMutation({
        input: credential
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

  /** Optional: Logout */
  logout() {
    return this.socialAuth.signOut();
  }
}
