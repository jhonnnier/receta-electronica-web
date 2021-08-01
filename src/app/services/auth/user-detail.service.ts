import {Injectable} from '@angular/core';
import {DataUser} from "../../dtos/DataUserModel";
import {HttpClient} from "@angular/common/http";
import {UrlUtils} from "../../@core/utils/UrlUtils";
import {EndpointEnum} from "../../@core/enums/EndpointEnum";
import {MedicoAuditorDTO} from "../../dtos/MedicoAuditorDTO";

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  constructor(private httpClient: HttpClient) {
  }

  getDataLoggedUser(username, userRol): Promise<any> {
    const path = `${UrlUtils.getUrl(EndpointEnum.usuario)}?username=${username}&rol=${userRol}`;
    return this.httpClient.get<any>(path).toPromise();
  }

  set usuario(val) {
    localStorage.setItem('data-user', JSON.stringify(val));
  }

  get usuario(): DataUser {
    const object = JSON.parse(localStorage.getItem('data-user'));
    return object ? object.usuario as DataUser : null;
  }

  get auditor(): MedicoAuditorDTO {
    const object = JSON.parse(localStorage.getItem('data-user'));
    return object ? object.auditor as MedicoAuditorDTO : null;
  }

  get medico(): MedicoAuditorDTO {
    const object = JSON.parse(localStorage.getItem('data-user'));
    return object ? object.medico as MedicoAuditorDTO : null;
  }

  get userRol(): string {
    return this.usuario.rol;
  }
}
