import {Component, HostListener, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {I18Service} from "./services/shared/i18.service";
import jwt_decode from "jwt-decode";
import * as moment from 'moment';
import {environment} from "../environments/environment";
import {storageKeys} from "@shared/constants/storage-keys.constants";
import {Router} from "@angular/router";
import Timeout = NodeJS.Timeout;

declare let isMobile: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  private language: Array<string>;
  mdlCloseSession = false;
  time: Timeout;
  isMobile = isMobile();

  constructor(
    public translate: TranslateService,
    private i18Service: I18Service,
    private router: Router) {
    console.log('is mobile: ', isMobile());

  }

  ngOnInit(): void {
    this.language = ['es_ARG', 'en_COL'];
    this.translate.addLangs(this.language);
    this.translate.setDefaultLang('es_ARG');
    this.setI18('es_ARG');
  }

  async setI18(language: string) {
    try {
      const json = await this.i18Service.getI18(language);

      if (json) {
        this.i18Service.i18 = json;
      }
    } catch (error) {
      console.log(error);
    }
  }

  forceLogoutConfirm() {
    this.mdlCloseSession = false;
  }

  @HostListener('window:load', ['$event'])
  @HostListener('document:keydown', ['$event'])
  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:click', ['$event', '$event.target'])
  @HostListener('window:hashchange', ['$event'])
  forceLogoutToInactivityTime() {
    let url = window.location.href;

    if (!url.includes('/login/') && !this.mdlCloseSession) {
      const sessionExpirationTime = this.getSessionExpirationTime();
      clearTimeout(this.time);

      this.time = setTimeout(() => {
        url = window.location.href;

        if (url.includes('/login')) {
          return;
        }

        this.router.navigate(['login']);
        localStorage.clear();
        this.mdlCloseSession = true;

      }, 8000)
    }

  }

  private getSessionExpirationTime(): number {
    const webClientId = environment.webClientId;
    const lastAuthUser = localStorage.getItem(`CognitoIdentityServiceProvider.${webClientId}.LastAuthUser`);

    if (!localStorage.getItem(storageKeys.expired) && lastAuthUser) {
      const token = localStorage.getItem(`CognitoIdentityServiceProvider.${webClientId}.${lastAuthUser}.accessToken`);
      const tokenDecode = jwt_decode(token) as any;

      const iat = moment(tokenDecode.iat * 1000);
      const exp = moment(tokenDecode.exp * 1000);

      let expirationTimeInMilliseconds = exp.diff(iat);

      localStorage.setItem(storageKeys.expired, expirationTimeInMilliseconds.toString());
      this.showTimeLocalStorageAux();

      return expirationTimeInMilliseconds;
    }

    this.showTimeLocalStorageAux();

    return Number(localStorage.getItem(storageKeys.expired)) || 300000;
  }


  // TODO: eliminar el siguiente metodo de apoyo para QA (con invocaciones) cuando pase las validaciones.
  showTimeLocalStorageAux() {
    localStorage.setItem('next-logout', `${moment().add(localStorage.getItem(storageKeys.expired)).format('hh:mm:ss A')} en ${Number(localStorage.getItem(storageKeys.expired)) / 60000} minutos`);
  }
}
