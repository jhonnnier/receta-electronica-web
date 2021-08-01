import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DispensacionService} from '../../service/dispensacion.service';
import {DetalleDispensacion} from '../../modelos/DetalleDispensacion';
import {DetalleDispensacionBody} from '../../modelos/DetalleDispensacionBody';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmacionComponent} from '../../../shared/confirmacion/confirmacion.component';
import {TranslateService} from '@ngx-translate/core';
import {ScrollUtils} from '../../../@core/utils/ScrollUtils';
import {DateUtil} from '../../../@core/utils/DateUtil';
import {EnviarRecetaComponent} from '../enviarReceta/enviarReceta.component';
import {Utils} from "../../../utils/Utils";

@Component({
  selector: 'app-detalle-dispensacion',
  templateUrl: './detalle-dispensacion.component.html',
  styleUrls: ['./detalle-dispensacion.component.scss']
})
export class DetalleDispensacionComponent implements OnInit {

  @Input() idReceta: string;
  isDataReady: boolean = false;
  confirmedSuccess: boolean = false;
  detalleReceta: DetalleDispensacion;
  accion: string = '';
  mostrarAlertEstadoInvalido: boolean = false;
  mensajeError: string;
  mostrarConfirmacion: boolean = false;
  constructor(private activatedRoute: ActivatedRoute,
              private dispensacionService: DispensacionService,
              private dialog: MatDialog,
              private translateService: TranslateService) {
    Utils.bodyColor();
    this.translateService.setDefaultLang('es_ARG');
  }

  ngOnInit(): void {
    this.consulterDetalleReceta(this.idReceta);
  }

  private consulterDetalleReceta(idReceta: string): void{
    this.dispensacionService.getDetalleDispensacion(idReceta).subscribe(resp => {
      this.detalleReceta = resp;
      this.detalleReceta.fechaCreacionConvertida = DateUtil.giveFormatToDate(this.detalleReceta.fechaCreacion.toString());
      this.isDataReady = true;
    });
  }

  pedirConfirmarDispensacion(): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      disableClose: true,
      data: {
             titulo: this.translateService.instant('DISPENSACION_RECETA.tituloConfirmar'),
             mensaje: this.translateService.instant('DISPENSACION_RECETA.mensajeConfirmar'),
             tituloBotonConfirmar: this.translateService.instant('BOTONES_TITULOS.btnConfirmarDispensacion'),
             tituloBotonRegresar: this.translateService.instant('BOTONES_TITULOS.btnRegresarReceta')
             },
      panelClass: 'custom-modalbox' });

    dialogRef.afterClosed().subscribe(resp => {
      if (resp.confirmar){
        this.confirmarDispensacion();
      }
    });
  }

  confirmarDispensacion(): void{
    ScrollUtils.moveScrollToTop();
    this.mostrarAlertEstadoInvalido = false;
    let detalleBody = new DetalleDispensacionBody();
    detalleBody.numeroReceta = this.detalleReceta.numeroReceta;
    detalleBody.medicamentosDtos = this.detalleReceta.medicamentosDtos;
    this.dispensacionService.dispensarReceta(detalleBody, this.idReceta).subscribe(resp => {
      this.confirmedSuccess = true;
      this.accion = 'confirmada';
    }, (error) => {
      if (400 === error.status){
        this.mostrarAlertEstadoInvalido = true;
        this.mensajeError = this.getMensaje('RECETA.noSePuedeCambiarEstado',
          {recetaId: this.detalleReceta.numeroReceta, estado: 'Dispensada'});
      }
    });
  }

  salir(): void{
    this.accion = 'salir';
  }

  getMensaje(clave: string, parametros: any): string {
    return this.translateService.instant(clave, parametros);
  }

  enviarReceta(): void {
    this.mostrarConfirmacion = false;
    const dialogRef = this.dialog.open(EnviarRecetaComponent, {
      disableClose: true,
      width: '470px',
      data: {
        idReceta : this.idReceta
      },
      panelClass: 'custom-modalbox' });

    dialogRef.afterClosed().subscribe(resp => {
      if (resp.confirmar){
        this.mostrarConfirmacion = true;
        this.mensajeError = this.getMensaje('RECETA.recetaEnviada', {});
      }
    });
  }

  descargarReceta(): void {
    this.mostrarConfirmacion = true;
    this.mensajeError = this.getMensaje('RECETA.recetaDescargada', {});
    this.dispensacionService.decargarReceta(this.idReceta).subscribe(data => {
      window.open(data.urlReceta);
      this.mostrarConfirmacion = false;
    });
  }

}
