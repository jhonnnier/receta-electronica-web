import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RecetaTrabajadorDTO } from 'src/app/dtos/RecetaTrabajadorDTO';
import { RecetaService } from 'src/app/services/receta/receta.service';

@Component({
  selector: 'app-ver-detalle',
  templateUrl: './ver-detalle.component.html',
  styleUrls: ['./ver-detalle.component.scss']
})
export class VerDetalleComponent implements OnInit, OnDestroy {

  public verDetalleForm: FormGroup;
  public recetaTrabajadorDTO: RecetaTrabajadorDTO;
  private unsubscribe$ = new Subject<void>();
  public esEnviada = false;
  public correoActualizado = '';
  public errorBack = '';
  public correoActualizadoOK = false;
  public errorActualizando = false;
  public timeOutAlert = false;

  constructor(private fb: FormBuilder, 
              private recetaService: RecetaService,
              private router: Router) {
    this.establecerFormulario();
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.esEnviada = false;
    this.correoActualizado = '';
    this.errorBack = '';
    this.correoActualizadoOK = false;
    const idReceta = this.recetaService.getRecetaId();
    if (idReceta) {
      this.recetaService.getRecetaPorID(idReceta).pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: any) => {
        this.recetaTrabajadorDTO = res;
        this.verDetalleForm.get('correo').setValue(res.correoNotificacion);
        this.esEnviada = res.estadoReceta.codigo === 'ENVIADA' ? true : false;
        if(res.estadoReceta.codigo !== 'ENVIADA' && res.estadoReceta.codigo !== 'RECHAZADA'){
          this.recetaTrabajadorDTO.observacionAuditoria = null;
        }
        if(res.estadoReceta.codigo == 'RECHAZADA'){
          let alertas = this.recetaTrabajadorDTO.alertasReceta.filter(r => r.alertaMaestro.tipoAlerta == 1);
          this.recetaTrabajadorDTO.alertasReceta = alertas;
        }else {
          this.recetaTrabajadorDTO.alertasReceta = [];
        }
      });
    }else {
      this.router.navigateByUrl('pages/receta/buscarReceta');
    }
  }

  establecerFormulario(): any {
    this.verDetalleForm = this.fb.group({
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    });
  }

  get correoInvalido(): boolean {
    return this.verDetalleForm.get('correo').invalid && this.verDetalleForm.get('correo').touched;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.recetaTrabajadorDTO = null;
    this.correoActualizadoOK = false;
    this.timeOutAlert = false;
    this.correoActualizado = '';
  }

  actualizarCorreo(): void {
    if (this.verDetalleForm.valid) {

      const resUpdEmail = this.recetaService.updateCorreoAfiliadoReceta(
        this.recetaTrabajadorDTO.id, this.verDetalleForm.get('correo').value);
      const resResendEmail = this.recetaService.sendMail(this.verDetalleForm.get('correo').value, this.recetaTrabajadorDTO.id);

      forkJoin([resUpdEmail, resResendEmail])
      .pipe(takeUntil(this.unsubscribe$))
      // tslint:disable-next-line: deprecation
      .subscribe((res: any) => {
        if (res) {
          this.correoActualizado = this.verDetalleForm.get('correo').value;
          this.correoActualizadoOK = true;
          setTimeout(() => {
            this.timeOutAlert = true;
          }, 3000);
          setTimeout(() => {
            this.correoActualizadoOK = false;
          }, 4000);
        }
      }, ((err: any) => {
        if (err?.status === 200 && err?.error?.text.includes('Email re-send to')) {
          this.correoActualizado = this.verDetalleForm.get('correo').value;
          this.correoActualizadoOK = true;
          setTimeout(() => {
              this.timeOutAlert = true;
            }, 3000);
          setTimeout(() => {
              this.correoActualizadoOK = false;
            }, 4000);
        } else {
          this.errorBack = err.error?.message;
          this.errorActualizando = true;
          setTimeout(() => {
            this.timeOutAlert = true;
          }, 3000);
          setTimeout(() => {
            this.errorActualizando = false;
          }, 4000);
        }
      }));
    }
  }

  hasErrorControl(controlName: string, errorCode: string): boolean {
    return this.verDetalleForm.controls[controlName].hasError(errorCode);
  }

}
