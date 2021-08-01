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
  selector: 'app-forgot-password-confirm-code',
  templateUrl: './forgot-password-confirm-code.component.html',
  styleUrls: ['./forgot-password-confirm-code.component.scss', '../../../login.component.scss']
})
export class ForgotPasswordConfirmCodeComponent {
  loginForm: FormGroup = <FormGroup>{};
  login: Login = <Login>{};
  userOrEmail = '';
  errorShow = false;
  spinnerShow = false;
  passwordReset = true;
  i18: any;
  message = {
    value: '',
    type: ''
  };

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
    this.userOrEmail = this.activateRoute.snapshot.queryParams['username'];
  }

  loginFormInit(): void {
    this.loginForm = new FormGroup({
      code: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([
        CustomValidators.patternValidator(/\d/, {hasNumber: true}),
        CustomValidators.patternValidator(/[A-Z]/, {hasCapitalCase: true}),
        CustomValidators.patternValidator(/[a-z]/, {hasSmallCase: true}),
        CustomValidators.patternValidator(/(?=.*[~"!@#$%?\/&*]|[=()}"{+_:;,.><"-])/, {hasSpecialCharacters: true}),
        Validators.minLength(10)
      ])),
    })
  }

  async onClickSend(): Promise<void> {
    if (this.loginForm.invalid) {
      this.errorShow = true;
      return;
    }

    this.errorShow = false;
    this.spinnerShow = true;
    const values = this.loginForm.value;

    try {
      this.passwordReset = false;

      await this.authorizationService.forgotPasswordSubmit(this.userOrEmail.trim(), values.code.trim(), values.password.trim());

      this.passwordReset = true;
      this.cnxMessageService.success(this.i18.LOGIN.cognito.success.PasswordUpdateSuccess);
      this.goToLogin();

    } catch (error) {

      if (error.code === errorType.UserNotFoundException || error.code === errorType.CodeMismatchException) {
        this.cnxMessageService.error(this.i18.LOGIN.cognito.errors.CodeMismatchException);
      }

      if (error.code === errorType.ExpiredCodeException) {
        this.cnxMessageService.error(this.i18.LOGIN.cognito.errors.ExpiredCodeException);
      }

      if (error.code === errorType.LimitExceededException) {
        this.cnxMessageService.error(this.i18.LOGIN.cognito.errors.LimitExceededException);
      }

      if (error.code === errorType.InvalidPasswordException) {
        this.cnxMessageService.error(this.i18.LOGIN.cognito.errors.InvalidPasswordException);
      }
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
