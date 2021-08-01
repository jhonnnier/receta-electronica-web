import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './component/login.component';
import {LoginRoutingModule} from './login-routing.module';
import {AmplifyUIAngularModule} from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import {SharedModule} from '../shared/shared.module';
import {environment} from '../../environments/environment';

Amplify.configure({
  Auth: {
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: environment.poolId,
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: environment.webClientId,
  }
});

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    AmplifyUIAngularModule,
    SharedModule
  ]
})
export class LoginModule { }
