import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { AuthService } from '@service';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  loading: false,
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

      clear() {
        patchState(store, { accessToken: null, refreshToken: null });
        persist(null, null);
      },

      register(email: string, password: string, name: string) {
        patchState(store, { loading: true });
        const res = authService.register(email, password, name)();
        patchState(store, { loading: false });
      },

      loginEmail(email: string, password: string) {
        patchState(store, { loading: true });
        const res = authService.loginWithEmail(email, password)();
        const { accessToken, refreshToken } = res.data.loginWithEmail;
        this.setTokens(accessToken, refreshToken);
        patchState(store, { loading: false });
      },

      loginGoogle() {
        patchState(store, { loading: true });
        const res = authService.loginWithGoogle()();
        const { accessToken, refreshToken } = res?.data?.loginWithGoogle;
        this.setTokens(accessToken, refreshToken);
        patchState(store, { loading: false });
      },

      refresh() {
        const token = store.refreshToken()!;
        const res = authService.refreshToken(token)();
        const { accessToken, refreshToken } = res?.data.refreshToken;
        this.setTokens(accessToken, refreshToken);
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
