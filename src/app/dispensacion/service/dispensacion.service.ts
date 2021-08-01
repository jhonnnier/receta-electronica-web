import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {UrlUtils} from '../../@core/utils/UrlUtils';
import {EndpointEnum} from '../../@core/enums/EndpointEnum';
import {NgxSpinnerService} from 'ngx-spinner';
import {DetalleDispensacion} from '../modelos/DetalleDispensacion';
import {DetalleDispensacionBody} from '../modelos/DetalleDispensacionBody';
import {DescargaReceta} from '../modelos/DescargaReceta';

@Injectable({
  providedIn: 'root'
})
export class DispensacionService {

  constructor(private http: HttpClient,
              private spinner: NgxSpinnerService) { }

  validarCodigoDispensacion(idReceta: string, codigoDispensacion: string): Observable<any>{
    this.spinner.show();
    const params = new HttpParams()
      .set('id', idReceta)
      .set('codigoDispensa', codigoDispensacion);
    return this.http.get(UrlUtils.getUrl(EndpointEnum.verificarCodigoDispensacion), {params}).pipe(
      map(resp => {
        this.spinner.hide();
        return resp;
      }),
      catchError((error) => {
          this.spinner.hide();
          return throwError(error);
        }
      ));
  }

  getDetalleDispensacion(idReceta: string): Observable<DetalleDispensacion> {
    this.spinner.show();
    const params = new HttpParams()
      .set('id', idReceta);
    return this.http.get<DetalleDispensacion>(UrlUtils.getUrl(EndpointEnum.detalleDispensacion), { params }).pipe(
      map(resp => {
        this.spinner.hide();
        return resp;
      }),
      catchError((error) => {
          this.spinner.hide();
          return throwError(new Error(JSON.stringify(error)));
        }
      ));
  }

  dispensarReceta(detalleReceta: DetalleDispensacionBody, idReceta: string): Observable<any> {
    const params = new HttpParams()
      .set('id', idReceta);
    this.spinner.show();
    return this.http.post<any>(UrlUtils.getUrl(EndpointEnum.dispensarReceta), detalleReceta, { params }).pipe(
      map(resp => {
        this.spinner.hide();
        return  resp;
    }),
      catchError((error) => {
        this.spinner.hide();
        return throwError(error);
      }));
  }

  enviarReceta(idReceta: string, email: string): any {
    this.spinner.show();
    const params = new HttpParams()
      .set('recetaId', idReceta).set('email', email);
    return this.http.get(UrlUtils.getUrl(EndpointEnum.enviarReceta), {
      responseType : 'text',
      params: params
    }).pipe(
      map(resp => {
        this.spinner.hide();
        return resp;
      }),
      catchError((error) => {
          this.spinner.hide();
          return throwError(new Error(JSON.stringify(error)));
        }
      ));
  }

  decargarReceta(idReceta: string): Observable<DescargaReceta> {
    this.spinner.show();
    return this.http.get<DescargaReceta>(UrlUtils.getUrl(EndpointEnum.decargarReceta).replace('{idReceta}', idReceta)).pipe(
      map(resp => {
        this.spinner.hide();
        return resp;
      }),
      catchError((error) => {
          this.spinner.hide();
          return throwError(new Error(JSON.stringify(error)));
        }
      ));
  }
}
