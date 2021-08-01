import {Injectable} from '@angular/core';
import {AuthenticationDetails, CognitoUser, CognitoUserPool} from 'amazon-cognito-identity-js';
import {environment} from "../../../environments/environment";
import Amplify, {Auth} from 'aws-amplify';

Amplify.configure({
  Auth: {
    userPoolId: environment.poolId,
    userPoolWebClientId: environment.webClientId,
  }
});

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private _userCognito: CognitoUser = <CognitoUser>{};

  constructor() {
  }

  async signIn(username, password, newPassword = null): Promise<CognitoUser | any> {
    return await Auth.signIn(username, password);
  }

  async completeNewPassword(username, password, newPassword = null): Promise<any> {
    const user = await Auth.signIn(username, password);
    return await Auth.completeNewPassword(user, newPassword);
  }

  // Send confirmation code to user's email
  async forgotPassword(username): Promise<any> {
    return await Auth.forgotPassword(username);
  }

  // Collect confirmation code and new password, then
  async forgotPasswordSubmit(username, code, new_password) {
    await Auth.forgotPasswordSubmit(username, code, new_password);
  }

  get userCognito(): CognitoUser {
    return this._userCognito;
  }

  set userCognito(val: CognitoUser) {
    this._userCognito = val;
  }
}
