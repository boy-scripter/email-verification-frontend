import { inject, Injectable } from '@angular/core';
import { ApolloService } from '@util/service/apollo/apollo.service';
import {
  gqlResetPasswordMutation,
  gqlSendOtpMutation,
  gqlVerifyOtpMutation,
  ResetPasswordMutationVariables,
  VerifyOtpMutationVariables,
} from '../graphql/generated';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  private readonly apollo = inject(ApolloService);

  sendOtp(email: string) {
    return this.apollo.mutate(
      gqlSendOtpMutation({
        email,
      }),
    );
  }

  setNewPassword(input: ResetPasswordMutationVariables['input']) {
    return this.apollo.mutate(
      gqlResetPasswordMutation({
        input,
      }),
    );
  }

  verifyOtp(input: VerifyOtpMutationVariables['input']) {
    return this.apollo.mutate(
      gqlVerifyOtpMutation({
        input,
      }),
    );
  }
}
