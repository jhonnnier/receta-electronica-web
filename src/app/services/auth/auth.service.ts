import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import jwt_decode from 'jwt-decode';
import {UrlUtils} from '../../@core/utils/UrlUtils';
import {environment} from '../../../environments/environment';
import {UsuarioSesion} from '../../login/modelos/UsuarioSesion';
import {Token} from '../../login/modelos/Token';
import {KeyLocalStorage} from '../../common/KeyLocalStorage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usarioSesion: UsuarioSesion;
  constructor(private http: HttpClient,
              private route: Router) {
    this.usarioSesion = new UsuarioSesion();
  }

  isLogged(): boolean {
    return !(!localStorage.getItem(KeyLocalStorage.TOKEN));
  }

  setToken(accessToken: any): void{
    localStorage.setItem(KeyLocalStorage.TOKEN, accessToken.jwtToken);
    localStorage.setItem(KeyLocalStorage.ROL_USUARIO, accessToken.payload['cognito:groups']);
  }

  getRolUsuario(): string{
    return localStorage.getItem(KeyLocalStorage.ROL_USUARIO);
  }

  private decodificarIdToken(usarioSesion: UsuarioSesion, idToken: string): void{
    const roles: any = jwt_decode(idToken);
    usarioSesion.grupos = roles['cognito:groups'];
  }

  private convertirTokenADTO(tokenJwt: any): Token{
    return Object.assign(new Token(), tokenJwt);
  }
}
