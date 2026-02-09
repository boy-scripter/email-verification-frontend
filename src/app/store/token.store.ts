import { inject } from '@angular/core';
import { withStorage } from '@larscom/ngrx-signals-storage';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { TokenService } from '../services/token.service';

interface TokenState {
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: TokenState = {
  accessToken: null,
  refreshToken: null,
};

export const TokenStore = signalStore(
  { providedIn: 'root' },
  withState<TokenState>(initialState),
  withStorage('token', () => localStorage),
  withMethods((store) => {
    const tokenService = inject(TokenService);
    return {
      async refreshMyAccessToken(): Promise<void> {
        const token = store.refreshToken()!;
        const res = await tokenService.refreshToken(token);
        const accessToken = res.data?.refreshToken.accessToken;
        if (!accessToken) {
          throw new Error('Server does not return access token');
        }
        patchState(store, { accessToken, refreshToken: token });
      },

      setTokens(access: string, refresh: string): void {
        patchState(store, { accessToken: access, refreshToken: refresh });
      },

      clear(): void {
        patchState(store, { accessToken: null, refreshToken: null });
      },
    };
  }),
);
