import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecetaTrabajadorDTO } from 'src/app/dtos/RecetaTrabajadorDTO';
import { ConsultaAuditorInterface } from 'src/app/interfaces/consultaAuditorInterface';
import { EstadoRecetaInterface } from 'src/app/interfaces/estadoRecetaInterface';
import { environment } from 'src/environments/environment';
import {NgxSpinnerService} from 'ngx-spinner';
import {map} from 'rxjs/operators';
import { UserDetailService } from 'src/app/services/auth/user-detail.service';

@Injectable({
  providedIn: 'root'
})
export class AuditorService {

  private urlBase = environment.baseUrl;

  constructor(private http: HttpClient,
              private spinner: NgxSpinnerService,
              private userService: UserDetailService) { }

  getEstadoReceta(): Observable<Array<EstadoRecetaInterface>> {
    return this.http.get<Array<EstadoRecetaInterface>>(`${this.urlBase}estados-receta` );
  }

  getRecetas(primeraBusqueda: boolean, consultaAuditorReceta: ConsultaAuditorInterface): Observable<RecetaTrabajadorDTO> {
    this.spinner.show();
    let params = new HttpParams();
    if (primeraBusqueda) {
      params = this.getPrimeraConsultaParams(consultaAuditorReceta);
    }
    else {
      params = this.getConsultaParams(consultaAuditorReceta);
    }
    return this.http.get<RecetaTrabajadorDTO>(`${this.urlBase}recetas-auditor`, { params }).pipe(map(resp => {
      this.spinner.hide();
      return resp;
    }));
  }

  getRecetaPorID(idReceta: string): Observable<RecetaTrabajadorDTO> {
    this.spinner.show();
    let params = new HttpParams();
    params = params.append('idFinanciador', this.userService.auditor?.financiadorId);
    return this.http.get<RecetaTrabajadorDTO>(`${this.urlBase}recetas/` + idReceta, {params }).pipe(
      map(resp => {
        this.spinner.hide();
        return resp;
      })
    );
  }

  private getConsultaParams(objAuditor: ConsultaAuditorInterface): HttpParams {
    let paramsTemp = new HttpParams();
    paramsTemp = paramsTemp.append('idFinanciador', this.userService.auditor?.financiadorId);
  
    if (objAuditor.fechaCreacionDesde && objAuditor.fechaCreacionDesde !== '') {
      paramsTemp = paramsTemp.append('fechaCreacionDesde', objAuditor.fechaCreacionDesde);
    }
    if (objAuditor.fechaCreacionHasta && objAuditor.fechaCreacionHasta !== '') {
      paramsTemp = paramsTemp.append('fechaCreacionHasta', objAuditor.fechaCreacionHasta);
    }
    if (objAuditor.numeroReceta && objAuditor.numeroReceta !== '') {
      paramsTemp = paramsTemp.append('numeroReceta', objAuditor.numeroReceta);
    }
    if (objAuditor.estadoReceta && objAuditor.estadoReceta !== '') {
      paramsTemp = paramsTemp.append('estadoReceta', objAuditor.estadoReceta);
    }
    if (objAuditor.numeroSiniestro && objAuditor.numeroSiniestro !== '') {
      paramsTemp = paramsTemp.append('numeroSiniestro', objAuditor.numeroSiniestro);
    }
    if (objAuditor.page && objAuditor.page !== -1) {
      paramsTemp = paramsTemp.append('page', objAuditor.page.toString());
    } else {
      paramsTemp = paramsTemp.append('page', '0');
    }
    if (objAuditor.size && objAuditor.size !== -1) {
      paramsTemp = paramsTemp.append('size', objAuditor.size.toString());
    } else {
      paramsTemp = paramsTemp.append('size', '20');
    }
    if (objAuditor.property && objAuditor.property !== '') {
      paramsTemp = paramsTemp.append('property', objAuditor.property);
    }
    if (objAuditor.direction && objAuditor.direction !== '') {
      paramsTemp = paramsTemp.append('direction', objAuditor.direction);
    }
    return paramsTemp;
  }

  private getPrimeraConsultaParams(objAuditor: ConsultaAuditorInterface): HttpParams {
    let paramsTemp = new HttpParams();
    paramsTemp = paramsTemp.append('idFinanciador', this.userService.auditor?.financiadorId);
    paramsTemp = paramsTemp.append('page', '0');
    paramsTemp = paramsTemp.append('size', '20');
    return paramsTemp;
  }

  setRecetaId(id : string) {
    sessionStorage.setItem('idReceta', id);
  }

  getRecetaId() : string {
    return sessionStorage.getItem('idReceta');
  }
}
