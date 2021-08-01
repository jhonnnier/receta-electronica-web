import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import { DiagnosticoDTO } from 'src/app/dtos/DiagnosticoDTO';
import { DosisFrecuenciaDTO } from 'src/app/dtos/DosisFrecuenciaDTO';
import { MedicamentoDTO } from 'src/app/dtos/MedicamentoDTO';
import { RecetaTrabajadorDTO } from 'src/app/dtos/RecetaTrabajadorDTO';
import { ConsultaTrabajadorInterface } from 'src/app/interfaces/consultaTrabajadorInterface';
import { FinalizarRecetaInterface } from 'src/app/interfaces/finalizarRecetaInterface';
import { environment } from 'src/environments/environment';
import {UrlUtils} from '../../@core/utils/UrlUtils';
import {EndpointEnum} from '../../@core/enums/EndpointEnum';
import {RechazarRecetaRequest} from '../../@core/request/RechazarRecetaRequest';
import {NgxSpinnerService} from 'ngx-spinner';
import {catchError, map} from 'rxjs/operators';
import { ValidarRecetaDTO } from 'src/app/dtos/ValidarRecetaDTO';
import { AfiliadoService } from '../afiliado/afiliado.service';
import { UserDetailService } from '../auth/user-detail.service';
import { UsuarioDTO } from 'src/app/dtos/UsuarioDTO';


@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  private urlBase = environment.baseUrl;
  
  constructor(private http: HttpClient,
              private spinner: NgxSpinnerService,
              private afiliadoServices: AfiliadoService,
              private userServices: UserDetailService) { }

  getDiagnosticos(searchDx: string): Observable<DiagnosticoDTO[]> {
    let params = new HttpParams();
    params = params.append('codigoDescripcion', searchDx);
    return this.http.get<DiagnosticoDTO[]>(`${this.urlBase}diagnosticos`, { params });
  }

  getMedicamentos(searchMedto: string): Observable<MedicamentoDTO[]> {
    let params = new HttpParams();
    params = params.append('nombre', searchMedto);
    return this.http.get<MedicamentoDTO[]>(`${this.urlBase}medicamentos`, { params });
  }

  getDosis(): Observable<DosisFrecuenciaDTO[]> {
    return this.http.get<DosisFrecuenciaDTO[]>(`${this.urlBase}dosismedicamentos`);
  }

  getFrecuencia(): Observable<DosisFrecuenciaDTO[]> {
    return this.http.get<DosisFrecuenciaDTO[]>(`${this.urlBase}frecuenciasmedicamentos`).pipe(
      map(resp => {
        return resp;
      })
    );
  }

  crearReceta(bodyReceta: FinalizarRecetaInterface): Observable<any> {
    this.spinner.show();
    let params = new HttpParams();
    params = params.append('idFinanciador', this.afiliadoServices.getFinanciadorId().toString());
    params = params.append('idMedicoPrestador', this.userServices.medico?.prestadorMedicoId);
    bodyReceta.usuarioDto = this.getUsuarioDto(bodyReceta);
    return this.http.post<MedicamentoDTO[]>(`${this.urlBase}recetas`, bodyReceta, { params }).pipe(
      map(resp => {
        this.spinner.hide();
        return resp;
      }), catchError((error) => {
        this.spinner.hide();
        return throwError(error);
      })
    );
  }

  sendMail(email: string, recetaId: string): any {
    let params = new HttpParams();
    params = params.append('email', email);
    params = params.append('recetaId', recetaId);
    return this.http.get(`${this.urlBase}email/resend/receta`, { params });
  }

  getRecetas(primeraBusqueda: boolean, consultaTrabajadorReceta: ConsultaTrabajadorInterface): Observable<RecetaTrabajadorDTO> {
    this.spinner.show();
    let params = new HttpParams();
    this.spinner.show();
    if (primeraBusqueda) {
      params = this.getPrimeraConsultaParams(consultaTrabajadorReceta);
    }
    else {
      params = this.getConsultaParams(consultaTrabajadorReceta);
    }
    return this.http.get<RecetaTrabajadorDTO>(`${this.urlBase}recetas-medico`, { params }).pipe(map(resp => {
      this.spinner.hide();
      return resp;
    }));
  }

  getRecetaPorID(idReceta: string): Observable<RecetaTrabajadorDTO> {
    this.spinner.show();
    let params = new HttpParams();
    return this.http.get<RecetaTrabajadorDTO>(`${this.urlBase}recetas/` + idReceta, { params }).pipe(
      map(resp => {
        this.spinner.hide();
        return resp;
      }));
  }

  updateCorreoAfiliadoReceta(idReceta: string, correoActualizar: string): Observable<any> {
    const params = new HttpParams().set('correoNotificacion', correoActualizar);
    return this.http.put<MedicamentoDTO[]>(`${this.urlBase}recetas/` + idReceta, '', {params, observe: 'response' });
  }

  private getConsultaParams(objTrabajador: ConsultaTrabajadorInterface): HttpParams {
    let paramsTemp = new HttpParams();
    paramsTemp = paramsTemp.append('prestadorMedicoId', this.userServices.medico?.prestadorMedicoId);

    if (objTrabajador.nombres && objTrabajador.nombres !== '') {
      paramsTemp = paramsTemp.append('nombres', objTrabajador.nombres);
    }
    if (objTrabajador.apellidos && objTrabajador.apellidos !== '') {
      paramsTemp = paramsTemp.append('apellidos', objTrabajador.apellidos);
    }
    if (objTrabajador.tipoDocumento && objTrabajador.tipoDocumento !== '') {
      paramsTemp = paramsTemp.append('tipoDocumento', objTrabajador.tipoDocumento);
    }
    if (objTrabajador.numeroDocumento && objTrabajador.numeroDocumento !== '') {
      paramsTemp = paramsTemp.append('documento', objTrabajador.numeroDocumento);
    }
    if (objTrabajador.siniestro && objTrabajador.siniestro !== '') {
      paramsTemp = paramsTemp.append('numeroSiniestro', objTrabajador.siniestro);
    }
    if (objTrabajador.page && objTrabajador.page !== -1) {
      paramsTemp = paramsTemp.append('page', objTrabajador.page.toString());
    } else {
      paramsTemp = paramsTemp.append('page', '0');
    }
    if (objTrabajador.size && objTrabajador.size !== -1) {
      paramsTemp = paramsTemp.append('size', objTrabajador.size.toString());
    } else {
      paramsTemp = paramsTemp.append('size', '20');
    }
    if (objTrabajador.property && objTrabajador.property !== '') {
      paramsTemp = paramsTemp.append('property', objTrabajador.property);
    }
    if (objTrabajador.direction && objTrabajador.direction !== '') {
      paramsTemp = paramsTemp.append('direction', objTrabajador.direction);
    }
    return paramsTemp;
  }

  private getPrimeraConsultaParams(objTrabajador: ConsultaTrabajadorInterface): HttpParams {
    let paramsTemp = new HttpParams();
    paramsTemp = paramsTemp.append('prestadorMedicoId', this.userServices.medico?.prestadorMedicoId);
    paramsTemp = paramsTemp.append('page', '0');
    paramsTemp = paramsTemp.append('size', '20');
    return paramsTemp;
  }

  rechazarReceta(idRecetapa: string, body: RechazarRecetaRequest): Observable<any> {
    this.spinner.show();
    body.usuarioDto = this.getUsuarioDto(null);
    return this.http.patch<any>(UrlUtils.getUrl(EndpointEnum.recharzarReceta) + idRecetapa + '/estado', body).pipe(
      map(resp => {
        this.spinner.hide();
        return resp;
      }),
      catchError((error) => {
        this.spinner.hide();
        return throwError(error);
      }));
  }

  aprobarReceta(idRecetapa: string, body: RechazarRecetaRequest): Observable<any> {
    this.spinner.show();
    body.usuarioDto = this.getUsuarioDto(null);
    return this.http.patch<any>(UrlUtils.getUrl(EndpointEnum.recharzarReceta) + idRecetapa + '/estado', body).pipe(
      map(resp => {
      this.spinner.hide();
      return resp;
    }),
      catchError((error) => {
        this.spinner.hide();
        return throwError(error);
    }));
  }

  validarReceta(bodyReceta: ValidarRecetaDTO): Observable<ValidarRecetaDTO> {
    this.spinner.show();
    const params = new HttpParams().append('idFinanciador', this.afiliadoServices.getFinanciadorId().toString());
    return this.http.post<ValidarRecetaDTO>(`${this.urlBase}validar-receta`, bodyReceta, {params : params}).pipe(
      map(resp => {
        this.spinner.hide();
        return resp;
      }), catchError((error) => {
        this.spinner.hide();
        return throwError(new Error(JSON.stringify(error)));
      })
    );
  }

  setRecetaId(id : string) {
    sessionStorage.setItem('idReceta', id);
  }

  getRecetaId() : string {
    return sessionStorage.getItem('idReceta');
  }

  getUsuarioDto(bodyReceta: FinalizarRecetaInterface) : UsuarioDTO {
    let data = this.userServices.usuario;
    let usuario = new UsuarioDTO();
    usuario.apellidos = data.primerApellido + ' ' + data.segundoApellido;
    usuario.nombres = data.primerNombre + ' ' + data.segundoNombre;
    usuario.idFinanciador = this.userServices.auditor?.financiadorId;
    usuario.prestadorMedicoId = this.userServices.medico?.prestadorMedicoId;
    usuario.numeroDocumento = data.numeroDocumento;
    usuario.tipoDocumento = data.tipoDocumentoId;
    usuario.rolUsuario = data.rol;
    usuario.nroMatriculaNacional = bodyReceta?.medico?.['nroMatricula'];
    return usuario;
  }
}
