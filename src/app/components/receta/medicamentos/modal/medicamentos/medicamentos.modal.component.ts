import { Component, ElementRef, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { DosisFrecuenciaDTO } from 'src/app/dtos/DosisFrecuenciaDTO';
import { MedicamentoDTO } from 'src/app/dtos/MedicamentoDTO';
import { MedicamentoInterface } from 'src/app/interfaces/medicamentoInterface';
import { TrabajadorSiniestroService } from 'src/app/services/afiliado/trabajador-siniestro.service';
import { RecetaService } from 'src/app/services/receta/receta.service';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.modal.component.html',
  styleUrls: ['./medicamentos.modal.component.scss']
})
export class MedicamentosModalComponent implements OnInit {

  @ViewChild('autocomplete') autocomplete: ElementRef;
  form: FormGroup;
  autocompleteMedicamento = new FormControl();
  public lstMedicamentosConsultar$: Observable<MedicamentoDTO[]>;
  public medicamentosSeleccionado: MedicamentoDTO = null;
  public errorDx = '';
  public esEdicion =  false;
  public agregarOtroMedto =  false;
  public disabledCantDosis = false;
  public notFoundRows = false;
  public medtoExiste = false;
  public lstFrecuencia$: DosisFrecuenciaDTO[];
  public lstPresentacion$: Observable<DosisFrecuenciaDTO[]>;
  isSubmitted = false;
  public showErrorFirstTime = false;

  constructor(public translate: TranslateService,
              private recetaService: RecetaService, private trabajadorSiniestroService: TrabajadorSiniestroService,
              private fb: FormBuilder, private dialogRef: MatDialogRef<MedicamentosModalComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: MedicamentoInterface) {
    // tslint:disable-next-line: deprecation
    this.translate.get('RECETA.noResultadosDx').subscribe(res => {
      this.errorDx = res;
    });
    this.notFoundRows = false;
    this.esEdicion = false;
    if (data !== null) {
      this.esEdicion = true;
      this.medicamentosSeleccionado = data.medicamento;
      this.cargarFormulario(data);
      if (data.presentacion === 'NO_APLICA') {
        this.form.controls.cantDosis.disable();
      }
    } else {
      this.crearFormulario();
    }
  }

  crearFormulario(): void {
    this.form = this.fb.group({
      autocompleteMedicamento: ['', Validators.required],
      cantDosis: [{value: '', disabled: false}, Validators.required],
      presentacion: ['', Validators.required],
      cantFrecuencia: ['', Validators.required],
      frecuencia: ['', Validators.required],
      cantidad: [1, [Validators.required, this.min]],
      indicaciones: ['', Validators.required],
    });
  }

  cargarFormulario(medtoEditar: MedicamentoInterface): void {
    this.form = this.fb.group({
      autocompleteMedicamento: [medtoEditar.medicamento, Validators.required],
      cantDosis: [medtoEditar.cantDosis, Validators.required],
      presentacion: [medtoEditar.presentacion, Validators.required],
      cantFrecuencia: [medtoEditar.cantFrecuencia, Validators.required],
      frecuencia: [medtoEditar.frecuencia, Validators.required],
      cantidad: [medtoEditar.cantidadMedto, [Validators.required, this.min]],
      indicaciones: [medtoEditar.indicaciones, Validators.required],
    });
  }

  ngOnInit(): void {
    this.setEvento();
    this.recetaService.getFrecuencia().subscribe(resp => {
      this.lstFrecuencia$ = resp;
    });
    this.lstPresentacion$ = this.recetaService.getDosis();
    this.showErrorFirstTime = false;
  }

  private setEvento(): void {
    this.lstMedicamentosConsultar$ = this.form.get('autocompleteMedicamento').valueChanges.pipe(
      debounceTime(300),
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
    this.medicamentosSeleccionado = event.option.value;
  }

  displayFn(medTo: MedicamentoDTO): string {
    let nombre = '';
    if (medTo.monodroga) {
      let nombreM = medTo.monodroga;
      nombreM = nombreM.charAt(0).toUpperCase() + nombreM.slice(1)
      nombre = nombreM + ' - ';
    }
    if (medTo.nombre) {
      nombre = nombre + medTo.nombre + ' - ';
    }
    if (medTo.presentacion) {
      nombre = nombre + medTo.presentacion;
    }
    return nombre;
  }

  private _filter(value: string): Observable<MedicamentoDTO[]>  {
    this.showErrorFirstTime = true;
    const filterValue = this._normalizeValue(value);
    return this.recetaService.getMedicamentos(filterValue)
      .pipe(catchError(() => of([])));
  }

  private _normalizeValue(value: string): string {
    return value.toUpperCase();
  }

  guardar(): void {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
    } else {
      this.medtoExiste = false;
      if (this.medicamentosSeleccionado === null) {
        this.notFoundRows = true;
        return;
      }
      let lstMedicamentosSeleccionados: MedicamentoInterface[] = [];
      let medtoTemp = {} as MedicamentoInterface;
      lstMedicamentosSeleccionados = JSON.parse(localStorage.getItem('lstMedicamentosSeleccionados'));
      if (lstMedicamentosSeleccionados && lstMedicamentosSeleccionados.length > 0) {
        const existeMedto = lstMedicamentosSeleccionados.find(existe =>
          existe.medicamento.troquel === this.medicamentosSeleccionado.troquel);
        if (this.esEdicion) {
          medtoTemp = this.createObjMedicamento();
        } else {
          if (existeMedto) {
            this.medtoExiste = true;
            return;
          } else {
            medtoTemp = this.createObjMedicamento();
          }
        }
      } else {
        medtoTemp = this.createObjMedicamento();
      }
      if (!this.agregarOtroMedto) {
        this.dialogRef.close();
      } else {
        // this.form.controls['cantDosis'].reset();
        this.form.controls.cantDosis.enable();
        this.crearFormulario();
        this.setEvento();
        this.autocomplete.nativeElement.focus();
        this.isSubmitted = false;
      }
      this.trabajadorSiniestroService.setMedicamentoTrabajador(medtoTemp, this.data?.ind);
    }
  }

  private createObjMedicamento(): MedicamentoInterface {
    const medtoTemp = {} as MedicamentoInterface;
    medtoTemp.medicamento = this.medicamentosSeleccionado;
    medtoTemp.cantDosis = this.form.get(['cantDosis']).value;
    medtoTemp.presentacion = this.form.get('presentacion').value;
    medtoTemp.cantFrecuencia = this.form.get('cantFrecuencia').value;
    medtoTemp.frecuencia = this.form.get('frecuencia').value;
    medtoTemp.cantidadMedto = this.form.get('cantidad').value;
    medtoTemp.indicaciones = this.form.get('indicaciones').value;
    medtoTemp.frecuenciaDescripcion = this.lstFrecuencia$.filter(m => m.codigo === medtoTemp.frecuencia)[0]?.descripcion;
    return medtoTemp;
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  valNoAplica(event: any): void {
    if (event.target.value === 'NO_APLICA') {
      this.form.patchValue({
        cantDosis: 0
      });
      this.form.controls.cantDosis.disable();
    } else {
      this.form.controls.cantDosis.enable();
    }
  }

  quedoBlanco(event: any): void {
    if (event.target.value === '') {
      this.medtoExiste = false;
    }
  }

  get validAutocompleteMedto(): boolean {
    return this.form.get('autocompleteMedicamento').value === '' &&
    this.form.get('autocompleteMedicamento').touched &&
    this.form.get('autocompleteMedicamento').hasError('required');
  }

  get validCantPresentacion(): boolean {
    return this.form.get('cantDosis').touched && this.form.get('cantDosis').hasError('required');
  }

  get validPresentacion(): boolean {
    return this.form.get('presentacion').touched && this.form.get('presentacion').hasError('required');
  }

  get validCantFrecuencia(): boolean {
    return this.form.get('cantFrecuencia').touched && this.form.get('cantFrecuencia').hasError('required');
  }

  get validFrecuencia(): boolean {
    return this.form.get('frecuencia').touched && this.form.get('frecuencia').hasError('required');
  }

  get validCantidad(): boolean {
    return this.form.get('cantidad').touched && this.form.get('cantidad').hasError('required');
  }

  get validIndicaciones(): boolean {
    return this.form.get('indicaciones').touched && this.form.get('indicaciones').hasError('required');
  }

  minMax(control: FormControl): any {
    // tslint:disable-next-line: radix
    return parseInt(control.value) > 0 && parseInt(control.value) <= 5 ? null : {
      minMax: true
    };
  }

  min(control: FormControl): any {
    // tslint:disable-next-line: radix
    return parseInt(control.value) > 0 ? null : {
      min: true
    };
  }

  hasErrorControl(controlName: string, errorCode: string): boolean {
    return this.form.controls[controlName].hasError(errorCode) && this.isSubmitted;
  }

  titulo(str) : string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

}
