import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of} from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { DiagnosticoDTO } from 'src/app/dtos/DiagnosticoDTO';
import { TrabajadorSiniestroRecetaDTO } from 'src/app/dtos/TrabajadorSiniestroRecetaDTO';
import { ValidarRecetaDTO } from 'src/app/dtos/ValidarRecetaDTO';
import { AfiliadoInterface } from 'src/app/interfaces/validarAfiliadoInterface';
import { ValidarDxInterface } from 'src/app/interfaces/validarDxInterface';
import { ValidarSiniestroInterface } from 'src/app/interfaces/validarSiniestroInterface';
import { TrabajadorSiniestroService } from 'src/app/services/afiliado/trabajador-siniestro.service';
import { RecetaService } from 'src/app/services/receta/receta.service';
import { AlertaInterface } from 'src/app/interfaces/alertaInterface';

@Component({
  selector: 'app-diagnosticos',
  templateUrl: './diagnosticos.component.html',
  styleUrls: ['./diagnosticos.component.scss']
})
export class DiagnosticosComponent implements OnInit {

  @Output() cantidadDx = new EventEmitter<number>();
  @Output() cantidadAlertaDx = new EventEmitter<number>();
  @Output() getTrabajadorSiniestroReceta = new EventEmitter<TrabajadorSiniestroRecetaDTO>();
  @ViewChild('autocomplete') autocomplete;
  public lstDiagnosticosSeleccionados: DiagnosticoDTO[] = [];
  public lstDiagnosticosConsultar$: Observable<DiagnosticoDTO[]>;
  public errorDx = 'No se encontraron resultados';
  public showErrorFirstTime = false;
  selectable = true;
  removable = true;
  control = new FormControl();
  public showMsnDxObligatorio = false;
  private validarRecetaAlertas: ValidarRecetaDTO;

  constructor(public translate: TranslateService,
              private recetaService: RecetaService,
              public trabajadorSiniestroService: TrabajadorSiniestroService) {
    // tslint:disable-next-line: deprecation
    this.translate.get('RECETA.noResultadosDx').subscribe(data => {
      this.errorDx = data;
    });
    this.initObjValidarRecetaAlertas();
    this.trabajadorSiniestroService.setAlertasDxMed(this.validarRecetaAlertas);
  }

  ngOnInit(): void {
    this.setEvento();
    this.cantidadDx.emit(0);
    this.showErrorFirstTime = false;
    this.showMsnDxObligatorio = false;
  }

  private setEvento(): void {
    this.lstDiagnosticosConsultar$ = this.control.valueChanges.pipe(
      startWith(''),
      switchMap(value => {
        if (value.length >= 3) {
          return this._filter(value).pipe(map(res => res === null ? [] : res));
        } else {
          return of([]);
        }
      })
    );
  }

  opcionSeleccionada(event: any): void {
    const exiteDx = this.lstDiagnosticosSeleccionados.find(dx => dx.codigo.startsWith(event.option.value.codigo));
    if (!exiteDx) {
      if (this.lstDiagnosticosSeleccionados.length <= 5) {
        this.showMsnDxObligatorio = false;
        this.lstDiagnosticosSeleccionados.push(event.option.value);
        this.control.setValue('');
        this.autocomplete.nativeElement.blur();
        this.cantidadDx.emit(this.lstDiagnosticosSeleccionados.length);
        this.lstDiagnosticosSeleccionados.length === 5 ? this.control.disable() : this.control.enable();
        const objDx = {} as ValidarDxInterface;
        objDx.codigo =  event.option.value.codigo;
        objDx.descripcion =  event.option.value.descripcion;
        this.validarRecetaAlertas.diagnosticos.push(objDx);
        this.validarRecetaAlertas.medicamentos = this.trabajadorSiniestroService.getMedicamentosValidar();
        this.recetaService.validarReceta(this.validarRecetaAlertas).subscribe(res => {
          this.trabajadorSiniestroService.setAlertasDxMed(res);
          this.trabajadorSiniestroService.setCantAlertasDx(res.alertas.filter(tDx => tDx.tipo === 'Diagnostico').length);
        });
      }
    } else {
      this.control.setValue('');
      this.autocomplete.nativeElement.blur();
    }
  }

  remove(indexDx: number): void {
    if (indexDx >= 0) {
      this.lstDiagnosticosSeleccionados.splice(indexDx, 1);
      this.cantidadDx.emit(this.lstDiagnosticosSeleccionados.length);
      this.lstDiagnosticosSeleccionados.length <= 5 ? this.control.enable() : this.control.disable();
      this.validarRecetaAlertas.diagnosticos.splice(indexDx, 1);
      this.validarRecetaAlertas.medicamentos = this.trabajadorSiniestroService.getMedicamentosValidar();
      if (this.validarRecetaAlertas.diagnosticos.length > 0) {
        this.recetaService.validarReceta(this.validarRecetaAlertas).subscribe(res => {
          this.trabajadorSiniestroService.setAlertasDxMed(res);
          this.trabajadorSiniestroService.setCantAlertasDx(res.alertas.filter(tDx => tDx.tipo === 'Diagnostico').length);
        });
      } else {
        this.trabajadorSiniestroService.setAlertasDxMed(this.validarRecetaAlertas);
        this.trabajadorSiniestroService.setCantAlertasDx(0);
      }
    }
  }

  public isValidComponent(): boolean {
    if (this.lstDiagnosticosSeleccionados.length <= 0) {
      this.showMsnDxObligatorio = true;
    }
    else {
      this.showMsnDxObligatorio = false;
    }
    return this.showMsnDxObligatorio;
  }

  get diagnosticosSeleccionados(): Array<string> {
    const lstDxSelCodigo = [];
    this.lstDiagnosticosSeleccionados.forEach(cod => {
      lstDxSelCodigo.push({
        codigo: cod.codigo
      });
    });
    return lstDxSelCodigo;
  }

  private _filter(value: string): Observable<DiagnosticoDTO[]>  {
    this.showErrorFirstTime = true;
    const filterValue = this._normalizeValue(value);
    return this.recetaService.getDiagnosticos(filterValue)
      .pipe(catchError(() => of([])));
  }

  private _normalizeValue(value: string): string {
    return value.toUpperCase();
  }

  // Metodo para pruebas
  public emitirCantidadDx(cantDx: number): boolean {
    let res = false;
    if (cantDx > 0) {
      res = true;
    }
    return res;
  }

  private initObjValidarRecetaAlertas(): void {
    this.validarRecetaAlertas = {} as ValidarRecetaDTO;
    this.validarRecetaAlertas.alertas = [];
    this.validarRecetaAlertas.diagnosticos = [];
    this.validarRecetaAlertas.medicamentos = [];
    this.validarRecetaAlertas.siniestro = this.setObjSiniestro(this.trabajadorSiniestroService.getTrabajadorSiniestroReceta());
  }

  private setObjSiniestro(trabajadorSiniestroRecetaDTO: TrabajadorSiniestroRecetaDTO): ValidarSiniestroInterface {
    const objValidarSiniestro = {} as ValidarSiniestroInterface;
    objValidarSiniestro.afiliado = {} as AfiliadoInterface;
    objValidarSiniestro.numeroSiniestro = trabajadorSiniestroRecetaDTO?.siniestro?.numeroSiniestro;
    objValidarSiniestro.afiliado.documento = trabajadorSiniestroRecetaDTO?.afiliado?.documento;
    objValidarSiniestro.afiliado.email = trabajadorSiniestroRecetaDTO?.afiliado?.email;
    objValidarSiniestro.afiliado.fechaNacimiento = trabajadorSiniestroRecetaDTO?.afiliado?.fechaNacimiento;
    objValidarSiniestro.afiliado.sexo = trabajadorSiniestroRecetaDTO?.afiliado?.sexo;
    objValidarSiniestro.afiliado.telefono = +trabajadorSiniestroRecetaDTO?.afiliado?.telefono;
    objValidarSiniestro.afiliado.tipoDocumento = trabajadorSiniestroRecetaDTO?.afiliado?.tipoDocumento;
    return objValidarSiniestro;
  }

  getMensajeAlerta(alerta : AlertaInterface) {
    let mensaje = alerta.alertaMaestro.mensajeAlerta;
    if(mensaje.includes('[') && mensaje.includes(']')) {
      mensaje = mensaje.replace('[CODIGO_DIAGNOSTICO]', '<b>' + alerta.codigoDiagnostico + '</b>');
      mensaje = mensaje.replace('[DESCRIPCION_DIAGNOSTICO]', '<b>' + alerta.descripcionDiagnostico + '</b>');
    } else if(alerta.codigoDiagnostico != null && alerta.codigoDiagnostico != undefined){
      mensaje = ' <b> ' + alerta.codigoDiagnostico + ' - ' + alerta.descripcionDiagnostico + ' </b> - ' + mensaje; 
    }
    return mensaje;
  }
}
