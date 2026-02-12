import { computed, inject } from '@angular/core';
import { withStorage } from '@larscom/ngrx-signals-storage';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { AuthService } from '@service';
import { User } from '../graphql/generated';
import { TokenStore } from './token.store';
import { GoogleOAuthTokenResponse } from '@components/googlebtn.component';

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
        throw new Error('User should exist here');
      }
      return user;
    }),
    profile_image: computed(() => store.user()?.image?.key),
  })),
  withMethods((store) => {
    const authService = inject(AuthService); 
    const tokenStore = inject(TokenStore) ;

    return {
      setUserData(user: User) {
        localStorage.setItem('user', JSON.stringify(user));
        patchState(store, { user });
      },

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
        this.setUserData(user as User);
        patchState(store, { loading: false });
      },

      async loginGoogle(credential: GoogleOAuthTokenResponse) {
        patchState(store, { loading: true });
        const res = await authService.loginWithGoogle(credential);
        const { user } = res.data.loginWithGoogle;
        tokenStore.setTokens(
          res.data.loginWithGoogle.accessToken,
          res.data.loginWithGoogle.refreshToken,
        );
        this.setUserData(user as User);
        patchState(store, { loading: false });
      },

      logout() {
        tokenStore.clear();
        this.clear();
      },
    };
  }),
);
