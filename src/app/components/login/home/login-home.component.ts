import {Component, NgZone} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationDetails, CognitoUser, CognitoUserPool} from 'amazon-cognito-identity-js';
import {Router} from "@angular/router";
import {challengeName, errorType, userGroups} from "@shared/constants/cognito.constants";
import {I18Service} from "@services/shared/i18.service";
import {UserDetailService} from "@services/auth/user-detail.service";
import {Login} from "@components/login/model/login.model";
import {AuthorizationService} from "@services/auth/authorization.service";
import {CnxMessageService} from "@services/shared/cnx-message.service";

declare let isMobile: any;
declare let landscape: any;


@Component({
  selector: 'app-login-home',
  templateUrl: './login-home.component.html',
  styleUrls: ['./login-home.component.scss', '../login.component.scss']
})
export class LoginHomeComponent {
  loginForm: FormGroup = <FormGroup>{};
  login: Login = <Login>{};
  userRol = '';
  message = '';
  errorShow = false;
  i18: any;
  mobileMode = ''

  constructor(
    private authorizationService: AuthorizationService,
    private userDetailService: UserDetailService,
    private i18Service: I18Service,
    private cnxMessageService: CnxMessageService,
    private route: Router,
    private zone: NgZone
  ) {
    this.getI18();
    this.loginFormInit();

    if (isMobile()) {
      // document.getElementById("block-ui__wrapper").classList.add("block-ui__wrapper");
    }
    this.mobileMode = 'en landsacape';
    if (landscape()) {
      this.mobileMode = 'en potrait';
    }
  }

  loginFormInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required/*,
        Validators.email*/
      ]),
      password: new FormControl('', [Validators.required])
    })
  }

  async onClickLogIn(): Promise<CognitoUser | any> {

    if (this.loginForm.invalid) {
      this.errorShow = true;
      return;
    }

    try {
      this.errorShow = false;
      this.login = this.loginForm.value;

      const user = await this.authorizationService.signIn(this.login.username.trim(), this.login.password.trim());

      if (user.challengeName === challengeName.NEW_PASSWORD_REQUIRED) {
        this.goToNewPassword();
        return;
      }

      if (user.signInUserSession) {
        this.setUserRol(user);
        this.setDataLoggedUser();
      }

    } catch (e) {
      this.managementErrors(e);
    }
  }

  goToNewPassword(): void {
    this.route.navigate(
      ['login/new-password-required'],
      {
        queryParams: {
          username: this.login.username.trim(),
          code: this.login.password.trim()
        }
      });

    return;
  }

  setUserRol(data): void {
    const groups = data.signInUserSession.accessToken.payload['cognito:groups'];

    if (!groups) {
      this.cnxMessageService.error('El usuario no tiene asignado un Rol');
      return;
    }

    if (groups.find(x => x.toUpperCase() === userGroups.MEDICO)) {
      this.userRol = userGroups.MEDICO;
      return;
    }

    if (groups.find(x => x.toUpperCase() === userGroups.AUDITOR)) {
      this.userRol = userGroups.AUDITOR;
      return;
    }
  }

  async setDataLoggedUser(): Promise<void> {
    try {
      const dataLoggedUser = await this.userDetailService.getDataLoggedUser(this.login.username, this.userRol.toLocaleLowerCase());

      if (dataLoggedUser) {
        dataLoggedUser.usuario.rol = this.userRol;
        this.userDetailService.usuario = dataLoggedUser;
        this.redirectTo();
      }
    } catch (e) {
      console.error(e);
    }
  }

  redirectTo(): void {

    if (this.userRol.toUpperCase() === userGroups.MEDICO) {
      this.goTo('pages/receta/buscarReceta');
      return;
    }

    if (this.userRol.toUpperCase() === userGroups.AUDITOR) {
      this.goTo('pages/auditor/listadoReceta');
      return;
    }
  }

  managementErrors(err): void {
    this.message = '';

    switch (err.code) {
      case errorType.UserNotFoundException :
        this.cnxMessageService.error(this.i18.LOGIN.cognito.errors.UserNotFoundException);
        break;

      case errorType.NotAuthorizedException :
        this.cnxMessageService.error(this.i18.LOGIN.cognito.errors.NotAuthorizedException);
        break;

      default:
        break;
    }
  }

  goTo(path: string): void {
    this.zone.run(() => {
      this.route.navigate([path]);
    });
  }

  get loginControl(): any {
    return this.loginForm.controls;
  }

  async getI18() {
    this.i18 = this.i18Service.i18;
  }
}
