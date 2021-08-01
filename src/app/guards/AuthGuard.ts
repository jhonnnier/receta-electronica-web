import {Injectable} from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth/auth.service';
import {RoutesEnum} from '../common/RoutesEnum';
import {RolesEnum} from '../login/modelos/RolesEnum';
import {KeyLocalStorage} from '../common/KeyLocalStorage';
import {AuthorizationService} from "../services/auth/authorization.service";
import {UserDetailService} from "../services/auth/user-detail.service";

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService,
              private userDetailService: UserDetailService,
              private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;

    if (this.userDetailService.usuario) {

      if (url === '/') {

        if (RolesEnum.AUDITOR.valueOf() === this.userDetailService.userRol) {
          this.router.navigate(['pages/auditor/listadoReceta']);
          return true;
        }

        if (RolesEnum.MEDICO.valueOf() === this.userDetailService.userRol) {
          this.router.navigate(['pages/receta/buscarReceta']);
          return true;
        }
      } else {

        if (url.includes('/auditor/')) {

          if (RolesEnum.MEDICO.valueOf() === this.userDetailService.userRol) {
            this.router.navigate(['login']);
            localStorage.clear();
            return false;
          } else {

            if (RolesEnum.AUDITOR.valueOf() === this.userDetailService.userRol) {
              return true;
            }
          }
        } else if (url.includes('/receta/')) {

          if (RolesEnum.AUDITOR.valueOf() === this.userDetailService.userRol) {
            this.router.navigate(['login']);
            localStorage.clear();
            return false;
          }
        } else {

          if (RolesEnum.MEDICO.valueOf() === this.userDetailService.userRol) {
            return true;
          }
        }
      }

      return true;
    }

    this.router.navigate(['login']);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    return true;
  }
}
