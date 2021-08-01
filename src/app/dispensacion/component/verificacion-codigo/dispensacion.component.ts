import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DispensacionService} from '../../service/dispensacion.service';

@Component({
  selector: 'app-dispensacion',
  templateUrl: './dispensacion.component.html',
  styleUrls: ['./dispensacion.component.scss']
})
export class DispensacionComponent implements OnInit {

  formulario: FormGroup;
  idReceta: string;
  renderSuccesPage = false;
  codigoInvalido = false;
  mensajeError: string;
  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private dispensacionService: DispensacionService) { }

  ngOnInit(): void {
    this.idReceta = this.activatedRoute.snapshot.params.idReceta;
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this.formulario = this.formBuilder.group(
      {
        codigo1: ['', [Validators.required]],
        codigo2: ['', [Validators.required]],
        codigo3: ['', [Validators.required]],
        codigo4: ['', [Validators.required]],
        codigo5: ['', [Validators.required]],
        codigo6: ['', [Validators.required]],
      }
    );
  }

  verificar(): void {
    this.dispensacionService.validarCodigoDispensacion(this.idReceta, this.obtenerCodigoVerificacion()).subscribe(resp => {
      this.renderSuccesPage = resp.esValido;
      if (!resp.esValido){
        this.setMensajeError('El código ingresado es incorrecto');
      }
    }, (error) => {
      this.formulario.reset();
      if (400 === error.status){
        this.setMensajeError('Esta receta ya fue dispensada');
      }
    });
  }

  private setMensajeError(mensaje: string): void{
    this.mensajeError = mensaje;
    this.codigoInvalido = true;
  }

  private obtenerCodigoVerificacion(): string {
    let codigo = '';
    Object.keys(this.formulario.controls).forEach(key => {
      codigo = codigo.concat(this.formulario.controls[key].value);
    });
    return codigo.toUpperCase();
  }

  onChange(id: string, event: any): void {
    this.codigoInvalido = false;
    if (event){
      document.getElementById(id).focus();
    }
  }
}
