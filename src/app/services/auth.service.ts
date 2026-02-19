import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Injectable, inject } from '@angular/core';
import { GoogleOAuthTokenResponse } from '@components/googlebtn.component';
import { ApolloService } from '@util/service/apollo/apollo.service';
import {
  gqlLoginWithEmailMutation,
  gqlLoginWithGoogleMutation,
  gqlRegisterMutation,
  gqlUpdateProfileImageMutation,
  gqlUpdateProfileMutation,
  UserDto,
} from '../graphql/generated';

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
  async loginWithGoogle(credential: GoogleOAuthTokenResponse) {
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

  updateUserProfile(input: UserDto) {
    return this.apollo.mutate(
      gqlUpdateProfileMutation({
        input,
      }),
    );
  }

  updateProfileImage(fileId: string) {
    return this.apollo.mutate(
      gqlUpdateProfileImageMutation({
        fileId,
      }),
    );
  }

  /** Optional: Logout */
  logout() {
    return this.socialAuth.signOut();
  }
}
