import {Component, NgZone} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Login} from "@components/login/model/login.model";
import {AuthorizationService} from "@services/auth/authorization.service";
import {I18Service} from "@services/shared/i18.service";
import {CustomValidators} from "@shared/custom-validations";
import {errorType} from "@shared/constants/cognito.constants";
import {CnxMessageService} from "@services/shared/cnx-message.service";

@Component({
  selector: 'app-new-password-required',
  templateUrl: './new-password-required.component.html',
  styleUrls: ['./new-password-required.component.scss', '../../../login.component.scss']
})
export class NewPasswordRequiredComponent {
  loginForm: FormGroup = <FormGroup>{};
  login: Login = <Login>{};
  errorShow = false;
  message = '';
  i18: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private route: Router,
    private zone: NgZone,
    private authorizationService: AuthorizationService,
    private i18Service: I18Service,
    private cnxMessageService: CnxMessageService
  ) {
    this.getI18();
    this.loginFormInit();
    this.getParams();
  }

  getParams(): void {
    this.login.username = this.activateRoute.snapshot.queryParams['username'];
    this.login.password = this.activateRoute.snapshot.queryParams['code']
  }

  loginFormInit(): void {
    this.loginForm = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.required,
        CustomValidators.patternValidator(/\d/, {hasNumber: true}),
        CustomValidators.patternValidator(/[A-Z]/, {hasCapitalCase: true}),
        CustomValidators.patternValidator(/[a-z]/, {hasSmallCase: true}),
        CustomValidators.patternValidator(/(?=.*[~"!@#$%?\/&*]|[=()}"{+_:;,.><"-])/, {hasSpecialCharacters: true}),
        Validators.minLength(10)
      ])),
    })
  }

  async onClickUserValidate(): Promise<void> {
    this.errorShow = false;

    if (this.loginForm.invalid) {
      this.errorShow = true;
      return;
    }

    const newPassword = this.loginControl.password.value;
    this.errorShow = false;

    await this.authorizationService.completeNewPassword(this.login.username.trim(), this.login.password.trim(), newPassword)
      .then(user => {
        this.cnxMessageService.success(this.i18.LOGIN.cognito.success.PasswordUpdateSuccess);
        this.goToLogin();
      }).catch(e => {
        this.managementError(e);
      });
  }


  private managementError(error) {

    if (error.code === errorType.UserNotFoundException) {
      this.cnxMessageService.error(this.i18.LOGIN.cognito.errors.UserNotFoundException);
    }

    if (error.code === errorType.LimitExceededException) {
      this.cnxMessageService.error(this.i18.LOGIN.cognito.errors.LimitExceededException);
    }

    if (error.code === errorType.InvalidPasswordException) {
      this.cnxMessageService.error(this.i18.LOGIN.cognito.errors.InvalidPasswordException);
    }
  }

  goToLogin(): void {
    this.zone.run(() => {
      this.route.navigate(['login']);
    });
  }

  get loginControl(): any {
    return this.loginForm.controls;
  }

  async getI18() {
    this.i18 = this.i18Service.i18;
  }
}
