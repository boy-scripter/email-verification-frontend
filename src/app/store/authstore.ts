import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { AuthService } from '@service';
import { User } from '../graphql/generated';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  loading: boolean;
}
console.log(window);
const initialState: AuthState = {
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  loading: false,
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    isAuthenticated: computed(() => store.accessToken() !== null),
  })),
  withMethods((store, authService = inject(AuthService)) => {
    return {
      setTokens(access: string, refresh: string) {
        patchState(store, { accessToken: access, refreshToken: refresh });
        persist(access, refresh);
      },

      setUserData(user: User) {
        localStorage.setItem('user', JSON.stringify(user));
        patchState(store, { user });
      },

      clear() {
        patchState(store, { accessToken: null, refreshToken: null, user: null });
        persist(null, null);
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

function persist(access: string | null, refresh: string | null) {
  if (access) localStorage.setItem('accessToken', access);
  else localStorage.removeItem('accessToken');

  if (refresh) localStorage.setItem('refreshToken', refresh);
  else localStorage.removeItem('refreshToken');
}
