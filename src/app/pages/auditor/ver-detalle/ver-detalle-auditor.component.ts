import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RecetaTrabajadorDTO } from 'src/app/dtos/RecetaTrabajadorDTO';
import { AuditorService } from '../services/auditor.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-ver-detalle-aditor',
  templateUrl: './ver-detalle-auditor.component.html',
  styleUrls: ['./ver-detalle-auditor.component.scss']
})
export class VerDetalleAuditorComponent implements OnInit, OnDestroy {

  public recetaTrabajadorDTO: RecetaTrabajadorDTO;
  public isViewReady = false;
  private unsubscribe$ = new Subject<void>();
  mensajeErrorAlert: string;
  mostrarAlertaEstado: false;

  constructor(private auditorService: AuditorService,
              private router: Router,
              private translateService: TranslateService) {
    this.translateService.setDefaultLang('es_ARG');
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    if (history.state.mostrarAlertaEstado){
      this.mostrarAlertaEstado =  JSON.parse(history.state.mostrarAlertaEstado);
    }
    const idReceta = this.auditorService.getRecetaId();
    if (idReceta) {
      this.auditorService.getRecetaPorID(idReceta).pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: any) => {
        this.recetaTrabajadorDTO = res;
        if (this.mostrarAlertaEstado){
          this.mostrarAlertaDeEstado(this.recetaTrabajadorDTO.estadoReceta.descripcion);
        }
        this.isViewReady = true;
      })
    } else {
      this.router.navigateByUrl('pages/auditor/listadoReceta');
    }
  }

  mostrarAlertaDeEstado(estadoReceta: string): void{
    this.mensajeErrorAlert = this.getMensaje('RECETA.noSePuedeCambiarEstado',
      {recetaId: this.recetaTrabajadorDTO.numeroReceta, estado: estadoReceta});
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.recetaTrabajadorDTO = null;
  }

  getMensaje(clave: string, parametros: any): string {
    return this.translateService.instant(clave, parametros);
  }

  verAlerta(alerta: boolean) {
    if(alerta) {
      history.state.mostrarAlertaEstado = true;
      this.ngOnInit();
    } 
   }

}
