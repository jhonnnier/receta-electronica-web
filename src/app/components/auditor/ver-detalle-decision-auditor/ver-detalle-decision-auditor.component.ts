import {Component, Input, OnInit, Output} from '@angular/core';
import {RecetaService} from '../../../services/receta/receta.service';
import {DetalleRecetaTrabajadorDTO} from '../../../dtos/DetalleRecetaTrabajadorDTO';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RechazarRecetaRequest} from '../../../@core/request/RechazarRecetaRequest';
import {TranslateService} from '@ngx-translate/core';
import {AuditorService} from '../../../pages/auditor/services/auditor.service';
import {EstadoRecetaInterface} from '../../../interfaces/estadoRecetaInterface';
import {ScrollUtils} from '../../../@core/utils/ScrollUtils';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ver-detalle-decision-auditor',
  templateUrl: './ver-detalle-decision-auditor.component.html',
  styleUrls: ['./ver-detalle-decision-auditor.component.scss']
})
export class VerDetalleDecisionAuditorComponent implements OnInit {

  @Input() detalleReceta: DetalleRecetaTrabajadorDTO;
  @Input() verDesicion: boolean = true;
  @Output() verAlerta: EventEmitter<boolean> = new EventEmitter();

  formulario: FormGroup;
  isSubmitted = false;
  ESTADO_EN_REVISION = 'EN_REVISION';
  ESTADO_RECHZADA = 'RECHAZADA';
  ESTADO_APROBADA = 'APROBADA';
  estadoRechazado: EstadoRecetaInterface;
  estadoAprobada: EstadoRecetaInterface;
  constructor(private recetaService: RecetaService,
              private router: Router,
              private formBuilder: FormBuilder,
              private translateService: TranslateService,
              private auditorService: AuditorService) {
     this.translateService.setDefaultLang('es_ARG');
  }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.consultarEstadosReceta();
  }

  consultarEstadosReceta(): void {
    // tslint:disable-next-line: deprecation
    this.auditorService.getEstadoReceta().subscribe(resp => {
      this.estadoRechazado = resp.find(estado => estado.codigo === this.ESTADO_RECHZADA);
      this.estadoAprobada = resp.find(estado => estado.codigo === this.ESTADO_APROBADA);
    });
  }

  inicializarFormulario(): void {
    this.formulario = this.formBuilder.group({
      observacion: [this.detalleReceta !== undefined ? this.detalleReceta.observacionAuditoria : '', [Validators.required]]
    });
  }

  rechazar(): void {
    this.isSubmitted = true;
    if (this.formulario.controls.observacion.valid) {
      if (this.ESTADO_EN_REVISION !== this.detalleReceta.estadoReceta.codigo){
        this.recarcarPagina();
        return;
      }
      this.rechazarReceta(this.detalleReceta.id, this.crearObjetoRequest());
    }
  }

  recarcarPagina(): void {
    this.verAlerta.emit(true);
  }

  rechazarReceta(idReceta: string, request: RechazarRecetaRequest): void {
    // tslint:disable-next-line: deprecation
    this.recetaService.rechazarReceta(idReceta, request).subscribe(resp => {
       this.redirigirABusqueda('RECETA.recetaRechazadaExitosamente');
    }, (error) => {
      if (this.tieneEtadoInvalido(error.error.message)){
        this.recarcarPagina();
      }
    });
  }

  aprobarReceta(idReceta: string, request: RechazarRecetaRequest): void {
    // tslint:disable-next-line: deprecation
    this.recetaService.rechazarReceta(idReceta, request).subscribe(resp => {
      this.redirigirABusqueda('RECETA.recetaAprobadaExitosamente');
    }, (error) => {
      if (this.tieneEtadoInvalido(error.error.message)){
        this.recarcarPagina();
      }
    });
  }

  tieneEtadoInvalido(mensaje: string): boolean{
    return mensaje.toUpperCase().startsWith('CAMBIO');
  }

  redirigirABusqueda(claveMensaje: string): void{
    const mensaje = this.getMensaje(claveMensaje, {recetaId: this.detalleReceta.numeroReceta});
    this.router.navigate(['pages/auditor/listadoReceta'], { state: { mensajeDeExito: mensaje} });
    ScrollUtils.moveScrollToTop();
  }

  crearObjetoRequest(): RechazarRecetaRequest {
    const request: RechazarRecetaRequest = {
      id: this.detalleReceta.id,
      observacionAuditoria: this.formulario.controls.observacion.value,
      estadoReceta: {
        id: this.estadoRechazado.id,
        codigo: this.estadoRechazado.codigo
      }
    };
    return request;
  }

  crearObjAprobarRequest(): RechazarRecetaRequest {
    const request: RechazarRecetaRequest = {
      id: this.detalleReceta.id,
      observacionAuditoria: this.formulario.controls.observacion.value,
      estadoReceta: {
        id: this.estadoAprobada.id,
        codigo: this.estadoAprobada.codigo
      }
    };
    return request;
  }

  aprobar(): void {
    this.formulario.get('observacion').clearValidators();
    this.formulario.get('observacion').updateValueAndValidity();
    this.isSubmitted = true;
    if (this.ESTADO_EN_REVISION !== this.detalleReceta.estadoReceta.codigo){
      this.recarcarPagina();
      return;
    }
    this.aprobarReceta(this.detalleReceta.id, this.crearObjAprobarRequest());
  }

  hasErrorControl(controlName: string, errorCode: string): boolean {
    return this.formulario.controls[controlName].hasError(errorCode) && this.isSubmitted;
  }

  getMensaje(clave: string, parametros: any): string {
    return this.translateService.instant(clave, parametros);
  }

}
