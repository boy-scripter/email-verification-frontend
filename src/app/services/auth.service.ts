import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Apollo } from '@apollo-orbit/angular';
import { enviroment } from '@env';
import { googleLogin } from '@util/factory';
import { from, switchMap } from 'rxjs';
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
  private readonly apollo = inject(Apollo);

  /** Register */
  register(email: string, password: string, name: string) {
    return toSignal(
      this.apollo.mutate(
        gqlRegisterMutation({
          input: { email, password, name },
        }),
      ),
    );
  }

  /** Google Login */
  loginWithGoogle() {
    return toSignal(
      from(googleLogin(enviroment.google_auth_client_id)).pipe(
        switchMap((credential) =>
          this.apollo.mutate(
            gqlLoginWithGoogleMutation({
              input: credential,
            }),
          ),
        ),
      ),
    );
  }

  /** Email Login */
  loginWithEmail(email: string, password: string) {
    return toSignal(
      this.apollo.mutate(
        gqlLoginWithEmailMutation({
          input: { email, password },
        }),
      ),
    );
  }

  /** Refresh Token */
  refreshToken(refreshToken: string) {
    return toSignal(
      this.apollo.mutate(
        gqlRefreshTokenMutation({
          token: refreshToken,
        }),
      ),
    );
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
