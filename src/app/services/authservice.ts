import { Injectable, inject } from "@angular/core";
import { Apollo } from "apollo-angular";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import {
    gqlLoginWithGoogleMutation,
    gqlLoginWithEmailMutation,
    gqlRegisterMutation,
    gqlRefreshTokenMutation
} from "../graphql/generated";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly apollo = inject(Apollo);


    /** Register a new user */
    register(email: string, password: string, name: string) {
        return this.apollo.mutate(
            gqlRegisterMutation({
                input: {
                    email,
                    password,
                    name
                }
            })
        )
    }

    /** Login with Google */
    loginWithGoogle(googleToken: string) {
        
        return this.apollo.mutate(
            gqlLoginWithGoogleMutation({
                input: {
                    token: googleToken
                }
            })
        );
    }

    /** Login with Email/Password */
    loginWithEmail(email: string, password: string) {
        return this.apollo.mutate(
            gqlLoginWithEmailMutation({
                input: {
                    email,
                    password
                }
            })
        );
    }

    /** Refresh JWT token */
    refreshToken(refreshToken: string) {
        return this.apollo.mutate(
            gqlRefreshTokenMutation({
                token: refreshToken
            })
        );
    }

    /** Logout user (clear local storage or cookies) */
    logout(): void {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }

}
