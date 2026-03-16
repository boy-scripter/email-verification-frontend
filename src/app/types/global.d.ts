// src/globals.d.ts
declare module 'google-one-tap' {
  interface CredentialResponse {
    credential: string;
    clientId?: string;
  }

  function googleOneTap(
    options: {
      client_id: string;
      auto_select?: boolean;
      cancel_on_tap_outside?: boolean;
      context?: 'signin' | 'signup';
    },
    callback: (response: CredentialResponse) => void,
  ): void;

  export default googleOneTap;
  export type { CredentialResponse };
}
