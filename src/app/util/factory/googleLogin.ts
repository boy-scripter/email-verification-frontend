declare global {
  interface Window {
    google: any;
  }
}

export function googleLogin(clientId: string): Promise<any> {
  return new Promise((resolve, reject) => {
    if (!window.google?.accounts?.id) {
      reject(new Error('Google SDK not loaded'));
      return;
    }

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: (credentialResponse: any) => {
        if (!credentialResponse) {
          reject(new Error('No credential returned'));
          return;
        }

        // ✅ SUCCESS
        resolve(credentialResponse);
      },
    });

    window.google.accounts.id.prompt((notification: any) => {
      if (notification?.isNotDisplayed?.()) {
        reject(new Error(`One Tap not displayed: ${notification.getNotDisplayedReason?.()}`));
      }
    });
  });
}
