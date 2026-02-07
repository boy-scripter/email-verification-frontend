import { computed, inject } from '@angular/core';
import { withStorage } from '@larscom/ngrx-signals-storage';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { AuthService } from '@service';
import { User } from '../graphql/generated';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  loading: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  loading: false,
  user: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withStorage('auth', () => localStorage),
  withComputed((store) => ({
    isAuthenticated: computed(() => store.accessToken() !== null),
  })),
  withMethods((store, authService = inject(AuthService)) => {
    return {
      setTokens(access: string, refresh: string) {
        patchState(store, { accessToken: access, refreshToken: refresh });
      },

      setUserData(user: User) {
        localStorage.setItem('user', JSON.stringify(user));
        patchState(store, { user });
      },

      clear() {
        patchState(store, { accessToken: null, refreshToken: null, user: null });
      },

      async register(email: string, password: string, name: string) {
        patchState(store, { loading: true });
        await authService.register(email, password, name);
        patchState(store, { loading: false });
      },

      async loginEmail(email: string, password: string) {
        patchState(store, { loading: true });
        const res = await authService.loginWithEmail(email, password);
        const { accessToken, refreshToken, user } = res.data.loginWithEmail;
        this.setTokens(accessToken, refreshToken);
        this.setUserData(user as User);
        patchState(store, { loading: false });
      },

      async loginGoogle() {
        patchState(store, { loading: true });
        const res = await authService.loginWithGoogle();
        const { accessToken, refreshToken, user } = res.data.loginWithGoogle;
        this.setTokens(accessToken, refreshToken);
        this.setUserData(user as User);
        patchState(store, { loading: false });
      },

      async refreshMyAccessToken() {
        const token = store.refreshToken()!;
        const res = await authService.refreshToken(token);
        const { accessToken } = res.data.refreshToken;
        patchState(store, { loading: false });
        this.setTokens(accessToken, token);
      },

      logout() {
        authService.logout();
        this.clear();
      },
    };
  }),
);
