import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FinanciadorDTO } from 'src/app/dtos/FinanciadorDTO';
import { ConsultaTrabajadorInterface } from 'src/app/interfaces/consultaTrabajadorInterface';
import { TipoDocumentoInterface } from 'src/app/interfaces/tipoDocumentoInterface';
import { AfiliadoService } from 'src/app/services/afiliado/afiliado.service';

@Component({
  selector: 'app-consulta-encabezado',
  templateUrl: './consulta-encabezado.component.html',
  styleUrls: ['./consulta-encabezado.component.scss']
})
export class ConsultaEncabezadoComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();
  public searchForm: FormGroup;
  public lstTipoDocumento$: Observable<TipoDocumentoInterface[]>;
  public formSubmitted = false;
  public btnBuscarOn = true;
  public bNombre = true;
  public bDocumento = true;
  public bSiniestro = true;
  public lstFinanciadores: Observable<FinanciadorDTO[]>;
  public financiador : FinanciadorDTO;

  @Output() listarAfiliados: EventEmitter<FinanciadorDTO> = new EventEmitter();

  constructor(private fb: FormBuilder,
              private afiliadoService: AfiliadoService,
              private locationVar: Location) {
    this.establecerFormulario();
  }

  ngOnInit(): void {
    this.lstTipoDocumento$ = this.afiliadoService.getTipoDocumento();
    this.lstFinanciadores = this.afiliadoService.getFinanciadores();
  }

  buscar(): void {
    if (!this.btnBuscarOn && (!this.bNombre || !this.bDocumento || !this.bSiniestro) && this.searchForm.valid) {
      const objConsulta: ConsultaTrabajadorInterface = {
        financiador: this.financiador,
        nombres: this.searchForm.get('nombres').value === null ? '' : this.searchForm.get('nombres').value,
        apellidos: this.searchForm.get('apellidos').value === null ? '' : this.searchForm.get('apellidos').value,
        tipoDocumento: this.searchForm.get('tipoDocumento').value === null ? '' : this.searchForm.get('tipoDocumento').value,
        numeroDocumento: this.searchForm.get('numDocumento').value === null ? '' : this.searchForm.get('numDocumento').value,
        siniestro: this.searchForm.get('siniestro').value === null ? '' : this.searchForm.get('siniestro').value
      };

      // tslint:disable-next-line: deprecation
      this.afiliadoService.getAfiliadoSiniestro(objConsulta).pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
        this.listarAfiliados.emit(res);
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  establecerFormulario(): void {
    this.searchForm = this.fb.group({
      nombres: ['', [Validators.minLength(5)]],
      apellidos: ['', [Validators.minLength(5)]],
      tipoDocumento: [''],
      numDocumento: [''],
      siniestro: [''],
      financiador: [''],
      }, {
        validators: [this.valCamposBusqueda('nombres', 'apellidos'), this.valCamposBusqueda('tipoDocumento', 'numDocumento')]
      });
  }

  borrarFormulario(): void {
    this.establecerFormulario();
    this.btnBuscarOn = true;
    this.bNombre = true;
    this.bDocumento = true;
    this.bSiniestro = true;
    this.listarAfiliados.emit(null);
  }

  valCamposBusqueda(campoUno: string, campoDos: string): any {
    return (formGroup: FormGroup) => {
      const campoUnoTemp = formGroup.controls[campoUno];
      const campoDosTemp = formGroup.controls[campoDos];

      if ((campoUnoTemp.value !== '' && campoDosTemp.value !== '') || (campoUnoTemp.value === '' && campoDosTemp.value === '')) {
        campoUnoTemp.setErrors(null);
        campoDosTemp.setErrors(null);
      } else {
        campoUnoTemp.setErrors({ obligatorio: true });
        campoDosTemp.setErrors({ obligatorio: true });
      }
    };
  }

  hasErrorControl(controlName: string, errorCode: string): boolean {
    return this.searchForm.controls[controlName].hasError(errorCode);
  }

  regresar(): void {
    this.locationVar.back();
  }

  setFinanciador(value : string | number) {
    this.financiador = null;
    this.btnBuscarOn = true;
    if(value !== '') {
      this.btnBuscarOn = false;
      let financiadores: FinanciadorDTO[] = [];
      this.lstFinanciadores.subscribe(financia => {
        this.financiador = financia.find(f => f.id == value)
      });
    }
  }

}
