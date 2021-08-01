import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { AfiliadoDTO } from 'src/app/dtos/AfiliadoDTO';
import { SiniestroDTO } from 'src/app/dtos/SiniestroDTO';
import { TrabajadorSiniestroRecetaDTO } from 'src/app/dtos/TrabajadorSiniestroRecetaDTO';
import { TrabajadorSiniestroService } from 'src/app/services/afiliado/trabajador-siniestro.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-trabajador-siniestro',
  templateUrl: './trabajador-siniestro.component.html',
  styleUrls: ['./trabajador-siniestro.component.scss']
})
export class TrabajadorSiniestroComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();
  public afiliadoForm: FormGroup;
  public afiliadoDTO: AfiliadoDTO;

  constructor(private trabajadorSiniestroService: TrabajadorSiniestroService,
              private fb: FormBuilder,
              private router: Router) {
      this.afiliadoDTO = this.trabajadorSiniestroService.getTrabajadorSiniestro();
      this.establecerFormulario();
    }

  ngOnInit(): void {
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  establecerFormulario(): void {
    this.afiliadoForm = this.fb.group({
      grupoSexo: [this.afiliadoDTO !== undefined ? this.afiliadoDTO.sexo : '', Validators.required],
      fechaNacimiento: [this.afiliadoDTO !== undefined ? this.afiliadoDTO.fechaNacimiento : '', Validators.required],
      correo: [this.afiliadoDTO !== undefined ? this.afiliadoDTO.email : '', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      telefono: [this.afiliadoDTO !== undefined ? this.afiliadoDTO.telefono : '', Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
    });
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  validar(): void {
    if (this.afiliadoForm.invalid) {
      return Object.values(this.afiliadoForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  setTrabajadorSiniestroReceta(siniestro: SiniestroDTO): void {
    this.validar();
    if (this.afiliadoForm.valid) {
      const trabajadorSiniestroReceta: TrabajadorSiniestroRecetaDTO = new TrabajadorSiniestroRecetaDTO(this.afiliadoDTO, siniestro);
      trabajadorSiniestroReceta.afiliado.sexo = this.afiliadoForm.get('grupoSexo').value;
      trabajadorSiniestroReceta.afiliado.fechaNacimiento = moment(this.afiliadoForm.get('fechaNacimiento').value).format('YYYY-MM-DD');
      trabajadorSiniestroReceta.afiliado.email = this.afiliadoForm.get('correo').value;
      trabajadorSiniestroReceta.afiliado.telefono = this.afiliadoForm.get('telefono').value;
      this.trabajadorSiniestroService.setTrabajadorSiniestroReceta(trabajadorSiniestroReceta);
      this.router.navigateByUrl("/pages/receta");
    }
  }

  get sexoInvalido(): boolean {
    return this.afiliadoForm.get('grupoSexo').invalid && this.afiliadoForm.get('grupoSexo').touched;
  }

  get fechaNacimientoInvalido(): boolean {
    return this.afiliadoForm.get('fechaNacimiento').invalid  && this.afiliadoForm.get('fechaNacimiento').touched;
  }

  get correoInvalido(): boolean {
    return this.afiliadoForm.get('correo').invalid  && this.afiliadoForm.get('correo').touched;
  }

  hasErrorControl(controlName: string, errorCode: string): boolean {
    return this.afiliadoForm.controls[controlName].hasError(errorCode);
  }

}
