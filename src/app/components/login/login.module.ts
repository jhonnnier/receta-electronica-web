import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {LoginHomeComponent} from "./home/login-home.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {MessageService} from "primeng/api";
import {ForgotPasswordConfirmCodeComponent} from "@components/login/components/password-management/forgot-password-confirm-code/forgot-password-confirm-code.component";
import {NewPasswordRequiredComponent} from "@components/login/components/password-management/new-password-required/new-password-required.component";
import {ForgotPasswordSendEmailComponent} from "@components/login/components/password-management/forgot-password-send-email/forgot-password-send-email.component";
import {LoginComponent} from "@components/login/login.component";
import {LoginRoutingModule} from "@components/login/login-routing.module";
import {SharedModule} from "@shared/shared.module";
import {CnxMessageService} from "@services/shared/cnx-message.service";

@NgModule({
  declarations: [
    LoginComponent,
    LoginHomeComponent,
    NewPasswordRequiredComponent,
    ForgotPasswordSendEmailComponent,
    ForgotPasswordConfirmCodeComponent
  ],
  imports: [
    FormsModule,
    LoginRoutingModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ButtonModule,
    InputTextModule,
    TranslateModule
  ], exports: [
    LoginHomeComponent,
    NewPasswordRequiredComponent,
    ForgotPasswordSendEmailComponent,
    ForgotPasswordConfirmCodeComponent,
  ],
  providers: [
    TranslateService,
    MessageService,
    CnxMessageService
  ]
})
export class LoginModule {
}
