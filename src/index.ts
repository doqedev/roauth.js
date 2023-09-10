import * as tokensLib from './tokens'
import * as userLib from './user'

export type KeyResponse = {
    access_token: string,
    refresh_token: string,
    token_type: string,
    expires_in: number,
    id_token: string,
    scopes: string[]
}


/**
 * Specifies what authentication and consent pages are shown to the user. Note that certain screens are required for third-party apps and may not be skipped.
 * @enum {string}
 */

export enum Prompt {
    /**
   * No prompt is specified.
   * @member {string}
   */
    None = "none",

    /**
   * Prompt for login.
   * @member {string}
   */
    Login = "login",

    /**
   * Prompt for consent.
   * @member {string}
   */
    Consent = "consent",

    /**
   * Prompt for selecting an account.
   * @member {string}
   */
    SelectAccount = "select_account"
}

export enum ResponseType {
    None = "none",
    Code = "code"
}

type AuthFlowOptions = {
    ClientId: number | string,
    RedirectURI: string,
    Scopes: string[],
    ResponseType: ResponseType,
    Prompt?: Prompt,
    Nonce?: number,
    State?: string,
    CodeChallenge?: string,
    CodeChallengeMethod?: string
}

export function makeAuthLink(options: AuthFlowOptions) {
    const final: { [key: string]: any } = {
        client_id: options.ClientId,
        redirect_uri: options.RedirectURI,
        scope: !!(options.Scopes) ? options.Scopes.join(" ") : undefined,
        response_type: options.ResponseType,
        prompt: options.Prompt,
        nonce: options.Nonce,
        state: options.State,
        code_challenge: options.CodeChallenge,
        code_challenge_method: options.CodeChallengeMethod
    }

    const queryParams: string[] = [];

    for (const key in final) {
        if (final.hasOwnProperty(key) && final[key] != undefined && final[key] != null) {
            const value = encodeURIComponent(final[key]);
            const param = `${encodeURIComponent(key)}=${value}`;
            queryParams.push(param);
        }
    }

    return `https://apis.roblox.com/oauth/v1/authorize?` + queryParams.join("&")
}

export const tokens = tokensLib
export const user = userLib