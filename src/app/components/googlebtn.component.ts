import {
  Component,
  input,
  output,
  signal,
  OnInit,
} from '@angular/core';
import { enviroment } from '@env';
import { ButtonModule } from 'primeng/button';


declare global {
  interface Window {
    google: any;
  }
}

@Component({
  selector: 'app-google-btn',
  standalone: true,
  imports: [ButtonModule],
  template: `
    <p-button
      type="button"
      [label]="label()"
      (onClick)="login()"
      [disabled]="!ready()"
      fluid
    >
      <ng-template pTemplate="icon">
        <img src="/assets/icons/google.svg" class="bg-white p-1 rounded-full" alt="google-login" >
      </ng-template>
    </p-button>
  `,
})
export class GoogleBtnComponent implements OnInit {

  label = input('Continue with Google');
  credential = output<GoogleOAuthTokenResponse>();

  ready = signal(false);
  private codeClient!: any;

  async ngOnInit() {
    await this.loadScript();
    this.codeClient = window.google.accounts.oauth2['initTokenClient']({
      client_id: enviroment.google_auth_client_id,
      scope: 'openid profile email',
      callback: (res: GoogleOAuthTokenResponse) => {
        this.credential.emit(res);
      },
    });

    this.ready.set(true);
  }

  login() {
    this.codeClient.requestAccessToken({ prompt: 'consent' });

  }

  private loadScript(): Promise<void> {
    return new Promise(resolve => {
      if (window.google?.accounts) return resolve();
      const s = document.createElement('script');
      s.src = 'https://accounts.google.com/gsi/client';
      s.async = true;
      s.defer = true;
      s.onload = () => resolve();
      document.head.appendChild(s);
    });
  }
}

export interface GoogleOAuthTokenResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: 'Bearer';
  expiry_date : string
  prompt?: string;
}
