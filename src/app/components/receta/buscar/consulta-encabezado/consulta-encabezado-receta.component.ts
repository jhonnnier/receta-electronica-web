import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConsultaTrabajadorInterface } from 'src/app/interfaces/consultaTrabajadorInterface';
import { TipoDocumentoInterface } from 'src/app/interfaces/tipoDocumentoInterface';
import { AfiliadoService } from 'src/app/services/afiliado/afiliado.service';
import { RecetaService } from 'src/app/services/receta/receta.service';

@Component({
  selector: 'app-consulta-encabezado-receta',
  templateUrl: './consulta-encabezado-receta.component.html',
  styleUrls: ['./consulta-encabezado-receta.component.scss']
})
export class ConsultaEncabezadoRecetaComponent implements AfterViewInit {

  private unsubscribe$ = new Subject<void>();
  public searchForm: FormGroup;
  public lstTipoDocumento$: Observable<TipoDocumentoInterface[]>;

  @Output() listarRecetas: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder,
              private afiliadoService: AfiliadoService,
              private recetaService: RecetaService,
              private router: Router) {
      this.establecerFormulario();
   }

  ngAfterViewInit(): void {
    this.lstTipoDocumento$ = this.afiliadoService.getTipoDocumento();
  }

  private primerCargueRecetas(): void {
    const objConsulta = {} as ConsultaTrabajadorInterface;
    this.recetaService.getRecetas(true, objConsulta).pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      this.listarRecetas.emit(res);
    });
  }

  private getObjConsulta(): ConsultaTrabajadorInterface {
    return {
      nombres: this.filtersControl.nombres.value,
      apellidos: this.filtersControl.apellidos.value,
      tipoDocumento: this.filtersControl.tipoDocumento.value,
      numeroDocumento: this.filtersControl.numDocumento.value,
      siniestro: this.filtersControl.siniestro.value
    };
  }

  private filtersValidate(): boolean {

    if ((this.filtersControl.nombres.value && this.filtersControl.apellidos.value) ||
        (this.filtersControl.tipoDocumento.value && this.filtersControl.numDocumento.value) ||
        this.filtersControl.siniestro.value) {
      return true;
    }

    return false;
  }

  buscar(): void {

    if (this.filtersValidate()) {
      const objConsulta = this.getObjConsulta();

      // tslint:disable-next-line: deprecation
      this.recetaService.getRecetas(false, objConsulta).pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
        this.listarRecetas.emit(res);
        localStorage.setItem('objBusquedaReceta', JSON.stringify(objConsulta));
      });
    }
  }

  // tslint:disable-next-line: use-lifecycle-interface
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
      }, {
        validators: [this.valCamposBusqueda('nombres', 'apellidos'), this.valCamposBusqueda('tipoDocumento', 'numDocumento')]
      });
  }

  borrarFormulario(): void {
    this.establecerFormulario();
    localStorage.setItem('objBusquedaReceta', null);
    this.primerCargueRecetas();
  }

  valCamposBusqueda(campoUno: string, campoDos: string): any {
    return (formGroup: FormGroup) => {
      const campoUnoTemp = formGroup.controls[campoUno];
      const campoDosTemp = formGroup.controls[campoDos];

      if ((campoUnoTemp.value !== '' && campoDosTemp.value !== '') || (campoUnoTemp.value === '' && campoDosTemp.value === '')) {
        campoDosTemp.setErrors(null);
        campoUnoTemp.setErrors(null);
      } else {
        campoUnoTemp.setErrors({ obligatorio: true });
        campoDosTemp.setErrors({ obligatorio: true });
      }
    };
  }

  hasErrorControl(controlName: string, errorCode: string): boolean {
    return this.searchForm.controls[controlName].hasError(errorCode);
  }

  crearReceta(): void {
    this.router.navigate(['/pages/consultaTrabajador']);
  }

  get filtersControl(): any {
    return this.searchForm.controls;
  }
}
