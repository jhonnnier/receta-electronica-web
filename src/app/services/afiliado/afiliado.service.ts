import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FinanciadorDTO } from 'src/app/dtos/FinanciadorDTO';
import { ConsultaTrabajadorInterface } from 'src/app/interfaces/consultaTrabajadorInterface';
import { TipoDocumentoInterface } from 'src/app/interfaces/tipoDocumentoInterface';
import { environment } from '../../../environments/environment';
import {NgxSpinnerService} from 'ngx-spinner';
import {map} from 'rxjs/operators';
import { UserDetailService } from '../auth/user-detail.service';
import {storageKeys} from "@shared/constants/storage-keys.constants";

@Injectable({
  providedIn: 'root'
})
export class AfiliadoService {

  private urlBase = environment.baseUrl;
  private financiador: FinanciadorDTO;

  constructor(private http: HttpClient,
              private spinner: NgxSpinnerService,
              private userServices: UserDetailService) {}

  getTipoDocumento(): Observable<Array<TipoDocumentoInterface>> {
    return this.http.get<Array<TipoDocumentoInterface>>(`${this.urlBase}tiposdocumento` );
  }

  getAfiliadoSiniestro(consultaTrabajador: ConsultaTrabajadorInterface): Observable<FinanciadorDTO> {
    this.spinner.show();
    let params = new HttpParams();
    this.setFinanciador(consultaTrabajador.financiador);
    params = this.getConsultaParams(consultaTrabajador);
    return this.http.get<FinanciadorDTO>(`${this.urlBase}financiador/afiliados`, { params }).pipe(map(resp => {
      this.spinner.hide();
      return resp;
    }));
  }

  private getConsultaParams(objTrabajador: ConsultaTrabajadorInterface): HttpParams {
    let paramsTemp = new HttpParams();
    if (objTrabajador.financiador?.id !== 0) {
      paramsTemp = paramsTemp.append('idFinanciador', objTrabajador.financiador.id.toString());
    }
    if (objTrabajador.nombres !== '') {
      paramsTemp = paramsTemp.append('nombres', objTrabajador.nombres);
    }
    if (objTrabajador.apellidos !== '') {
      paramsTemp = paramsTemp.append('apellidos', objTrabajador.apellidos);
    }
    if (objTrabajador.tipoDocumento !== '') {
      paramsTemp = paramsTemp.append('tipoDocumento', objTrabajador.tipoDocumento);
    }
    if (objTrabajador.numeroDocumento !== '') {
      paramsTemp = paramsTemp.append('documento', objTrabajador.numeroDocumento);
    }
    if (objTrabajador.siniestro !== '') {
      paramsTemp = paramsTemp.append('numeroSiniestro', objTrabajador.siniestro);
    }
    return paramsTemp;
  }

  getFinanciadores(): Observable<Array<FinanciadorDTO>> {
    this.spinner.show();
    return this.http.get<Array<FinanciadorDTO>>(`${this.urlBase}financiador/financiadores/${this.userServices.medico?.prestadorMedicoId}`,).pipe(map(resp => {
      this.spinner.hide();
      return resp;
    }));
  }

  setFinanciador(financiador: FinanciadorDTO) {
    localStorage.setItem(storageKeys.dataFinanciador, JSON.stringify(financiador));
    this.financiador = financiador;
  }

  getFinanciadorId() : string | number {
    return !this.financiador ? this.getFinanciadorFromLocalStorage()?.id : this.financiador.id;
  }

  getRazonSocialFinanciador() : string {
    return !this.financiador ? this.getFinanciadorFromLocalStorage()?.razonSocial : this.financiador.razonSocial;
  }

  getFinanciadorFromLocalStorage(): FinanciadorDTO {

    if (localStorage.getItem(storageKeys.dataFinanciador)) {
      return JSON.parse(localStorage.getItem(storageKeys.dataFinanciador));
    }

    return null;
  }
}
