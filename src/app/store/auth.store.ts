import { computed, inject } from '@angular/core';
import { GoogleOAuthTokenResponse } from '@components/googlebtn.component';
import { withStorage } from '@larscom/ngrx-signals-storage';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { AuthService } from '@service';
import { User, UserDto } from '../graphql/generated';
import { TokenStore } from './token.store';

interface AuthState {
  user: User | null;
  loading: boolean;
}

const initialState: AuthState = {
  loading: false,
  user: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withStorage('auth', () => localStorage),
  withComputed((store) => ({
    isAuthenticated: computed(() => store.user() !== null),
    authenticateUser: computed(() => {
      const user = store.user();
      if (!user) {
        throw new Error('user should exist here');
      }
      return user;
    }),
    profile_image: computed(() => store.user()?.image?.key),
  })),
  withMethods((store) => {
    const authService = inject(AuthService);
    const tokenStore = inject(TokenStore);

    return {
      clear() {
        patchState(store, { user: null });
      },

      async register(email: string, password: string, name: string) {
        patchState(store, { loading: true });
        await authService.register(email, password, name);
        patchState(store, { loading: false });
      },

      async loginEmail(email: string, password: string) {
        patchState(store, { loading: true });
        const res = await authService.loginWithEmail(email, password);
        const { user } = res.data.loginWithEmail;
        tokenStore.setTokens(
          res.data.loginWithEmail.accessToken,
          res.data.loginWithEmail.refreshToken,
        );
        patchState(store, { loading: false, user: user as User });
      },

      async loginGoogle(credential: GoogleOAuthTokenResponse) {
        patchState(store, { loading: true });
        const res = await authService.loginWithGoogle(credential);
        const { user } = res.data.loginWithGoogle;
        tokenStore.setTokens(
          res.data.loginWithGoogle.accessToken,
          res.data.loginWithGoogle.refreshToken,
        );
        patchState(store, { loading: false, user: user as User });
      },

      async updateProfile(userDto: UserDto) {
        patchState(store, { loading: true });
        const res = await authService.updateUserProfile(userDto);
        const user = res.data.updateProfile;
        patchState(store, {
          loading: false,
          user: user as User,
        });
      },

      async updateProfileImage(fileId: string) {
        patchState(store, { loading: true });
        const res = await authService.updateProfileImage(fileId);
        const user = res.data.updateProfileImage;
        patchState(store, {
          loading: false,
          user: user as User,
        });
      },

      logout() {
        tokenStore.clear();
        this.clear();
      },
    };
  }),
);
