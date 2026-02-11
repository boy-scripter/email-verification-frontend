import { makeEnvironmentProviders } from '@angular/core';
import { GoogleLoginProvider, SOCIAL_AUTH_CONFIG, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { enviroment } from '@env';


export function provideSocialAuth() {
  return makeEnvironmentProviders([
    {
      provide: SOCIAL_AUTH_CONFIG,
      useFactory: () => {
        return {
          autoLogin: false,
          providers: [
            {
              id: GoogleLoginProvider.PROVIDER_ID,
              provider: new GoogleLoginProvider(enviroment.google_auth_client_id, {
                scopes: 'openid profile email',
              }),
            },
          ],
          onError: (err) => {
            console.error('Social login error:', err);
          },
        } as SocialAuthServiceConfig;
      },
    },
  ]);
}
