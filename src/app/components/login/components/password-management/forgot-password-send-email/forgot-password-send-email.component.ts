import {Component, NgZone} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Login} from "@components/login/model/login.model";
import {AuthorizationService} from "@services/auth/authorization.service";
import {I18Service} from "@services/shared/i18.service";
import {errorType} from "@shared/constants/cognito.constants";
import {CnxMessageService} from "@services/shared/cnx-message.service";

@Component({
  selector: 'app-forgot-password-send-email',
  templateUrl: './forgot-password-send-email.component.html',
  styleUrls: ['./forgot-password-send-email.component.scss', '../../../login.component.scss']
})
export class ForgotPasswordSendEmailComponent {
  loginForm: FormGroup = <FormGroup>{};
  login: Login = <Login>{};
  errorShow = false;
  spinnerShow = false;
  i18: any;

  constructor(
    private route: Router,
    private zone: NgZone,
    private authorizationService: AuthorizationService,
    private i18Service: I18Service,
    private cnxMessageService: CnxMessageService
  ) {
    this.getI18();
    this.loginFormInit();
  }

  loginFormInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(this.login.username, [
        Validators.required/*, Validators.email*/])
    })
  }

  async onClickSend(): Promise<void> {
    if (this.loginForm.invalid) {
      this.errorShow = true;
      return;
    }

    this.errorShow = false;
    this.spinnerShow = true;
    this.login = this.loginForm.value;

    try {
      await this.authorizationService.forgotPassword(this.login.username);
      this.goToConfirmCode();
    } catch (error) {
      // TODO: Habilitar si se requiere visualizar los mensajes de error.
      // this.managementError(error);
    }
  }

  private managementError(error) {

    if (error.code === errorType.UserNotFoundException) {
      this.cnxMessageService.success(this.i18.LOGIN.cognito.errors.UserNotFoundException);
    }

    if (error.code === errorType.LimitExceededException) {
      this.cnxMessageService.success(this.i18.LOGIN.cognito.errors.LimitExceededException);
    }
  }

  goTo(path: string): void {
    this.zone.run(() => {
      this.route.navigate([path]);
    });
  }

  goToConfirmCode() {
    this.route.navigate(
      ['login/forgot-password-confirm-code'],
      {
        queryParams: {
          username: this.login.username
        }
      });
  }

  get loginControl(): any {
    return this.loginForm.controls;
  }

  async getI18() {
    this.i18 = this.i18Service.i18;
  }
}
