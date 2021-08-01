import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDateRangePicker } from '@angular/material/datepicker';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConsultaAuditorInterface } from 'src/app/interfaces/consultaAuditorInterface';
import { EstadoRecetaInterface } from 'src/app/interfaces/estadoRecetaInterface';
import { AuditorService } from 'src/app/pages/auditor/services/auditor.service';

@Component({
  selector: 'app-listado-recetas-encabezado',
  templateUrl: './listado-recetas-encabezado.component.html',
  styleUrls: ['./listado-recetas-encabezado.component.scss']
})
export class ListadoRecetasEncabezadoComponent implements AfterViewInit {

  private unsubscribe$ = new Subject<void>();
  public searchAuditorForm: FormGroup;
  public lstEstadosReceta$: Observable<EstadoRecetaInterface[]>;
  public formSubmitted = false;
  public btnBuscarOn = true;

  @ViewChild('picker') picker: MatDateRangePicker<Moment>;

  @Output() listarRecetas: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder,
              private auditorService: AuditorService) {
    this.establecerFormulario();
  }

  ngAfterViewInit(): void {
    this.lstEstadosReceta$ = this.auditorService.getEstadoReceta();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  establecerFormulario(): void {
    this.searchAuditorForm = this.fb.group({
      numReceta: ['', [Validators.minLength(5)]],
      estado: ['', [Validators.minLength(5)]],
      fechaPrescripcionInicio: [''],
      fechaPrescripcionFin: [''],
      numSiniestro: ['']
    });
  }

  private primerCargueRecetas(): void {
    const objConsulta = {} as ConsultaAuditorInterface;
    this.auditorService.getRecetas(true, objConsulta).pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
      this.listarRecetas.emit(res);
    });
  }

  borrarFormulario(): void {
    this.picker.select(undefined);
    this.establecerFormulario();
    this.btnBuscarOn = true;
    localStorage.setItem('objBusquedaAuditorReceta', null);
    this.primerCargueRecetas();
  }

  verifyChangeDate(fecIni: HTMLInputElement, fecFin: HTMLInputElement): void {
    if (fecIni.value !== '' && fecFin.value !== '') {
      this.btnBuscarOn = false;
    } else {
      this.btnBuscarOn = true;
    }
  }

  buscar(): void {
    if (!this.btnBuscarOn) {
      const objConsulta: ConsultaAuditorInterface = {
        fechaCreacionDesde: this.searchAuditorForm.get('fechaPrescripcionInicio').value === null ? '' : moment(this.searchAuditorForm.get('fechaPrescripcionInicio').value).format('YYYY-MM-DD'),
        fechaCreacionHasta: this.searchAuditorForm.get('fechaPrescripcionFin').value === null
        ? '' : moment(this.searchAuditorForm.get('fechaPrescripcionFin').value).format('YYYY-MM-DD'),
        numeroSiniestro: this.searchAuditorForm.get('numSiniestro').value === null ? '' : this.searchAuditorForm.get('numSiniestro').value,
        numeroReceta:
        this.searchAuditorForm.get('numReceta').value === null ? '' : this.searchAuditorForm.get('numReceta').value,
        estadoReceta: this.searchAuditorForm.get('estado').value === null ? '' : this.searchAuditorForm.get('estado').value
      };

      if (objConsulta.fechaCreacionDesde === 'Invalid date') {
        objConsulta.fechaCreacionDesde = '';
      }
      if (objConsulta.fechaCreacionHasta === 'Invalid date') {
        objConsulta.fechaCreacionHasta = '';
      }

      // tslint:disable-next-line: deprecation
      this.auditorService.getRecetas(false, objConsulta).pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
        this.listarRecetas.emit(res);
        localStorage.setItem('objBusquedaAuditorReceta', JSON.stringify(objConsulta));
      });
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}

