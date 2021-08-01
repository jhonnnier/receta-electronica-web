import {ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {AuthState, CognitoUserInterface, onAuthUIStateChange} from '@aws-amplify/ui-components';
import {RolesEnum} from '../modelos/RolesEnum';
import {formFields, text} from '../constans/form-fields.constants';
import {Hub, Logger} from 'aws-amplify';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  user: CognitoUserInterface | null;
  authState: AuthState;
  text = text;
  formFields = formFields;

  constructor(private ref: ChangeDetectorRef,
              private authService: AuthService,
              private route: Router,
              private zone: NgZone) {
  }

  ngOnInit(): void {
    this.setAuthEvent();
    this.setAuthListener();
  }

  onAuthEvent(payload) {
    const log = new Logger('auth_watcher');
    switch (payload.event) {
      case 'signIn':
        log.error('user signed in');
        break;
      case 'signUp':
        log.error('user signed up');
        break;
      case 'signOut':
        log.error('user signed out');
        break;
      case 'signIn_failure':
        payload.data.message = 'Usuario o contraseña incorrecta';
        log.error('Usuario o contraseña incorrecta');
        break;
      case 'configured':
        log.error('the Auth module is configured');
    }
  }

  private setAuthEvent(): void {
    Hub.listen('auth', (data) => {
      const {payload} = data;
      this.onAuthEvent(payload);
    })
  }

  private setAuthListener() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;


      if (this.authState === 'signedin' && this.user) {
        this.authService.setToken(this.user.signInUserSession.accessToken);

        if (RolesEnum.AUDITOR.valueOf() === this.authService.getRolUsuario()) {
          this.navegarA('pages/auditor/listadoReceta');
        }

        if (RolesEnum.MEDICO.valueOf() === this.authService.getRolUsuario()) {
          this.navegarA('pages/receta/buscarReceta');
        }
      }

      this.ref.detectChanges();
    });
  }

  navegarA(ruta: string): void {
    this.zone.run(() => {
      this.route.navigate([ruta]);
    });
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
