import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {AfiliadoDTO} from 'src/app/dtos/AfiliadoDTO';
import {TrabajadorSiniestroRecetaDTO} from 'src/app/dtos/TrabajadorSiniestroRecetaDTO';
import {ValidarRecetaDTO} from 'src/app/dtos/ValidarRecetaDTO';
import {AlertaInterface} from 'src/app/interfaces/alertaInterface';
import {MedicamentoInterface} from 'src/app/interfaces/medicamentoInterface';
import {ValidarMedInterface} from 'src/app/interfaces/validarMedInterface';
import {RecetaService} from '../receta/receta.service';
import {storageKeys} from "@shared/constants/storage-keys.constants";

@Injectable({
  providedIn: 'root'
})
export class TrabajadorSiniestroService {
  private trabajadorSiniestro: AfiliadoDTO;
  private trabajadorSiniestroRecetaDTO: TrabajadorSiniestroRecetaDTO;
  private lstMedicamentosGlobal: MedicamentoInterface[];
  private lstMedicamentosSeleccionadosTrabajador: BehaviorSubject<MedicamentoInterface[]> = new BehaviorSubject([]);
  private trabajadorSiniestroSubject = new Subject<any>();
  private ttmtoProlongado: BehaviorSubject<boolean> = new BehaviorSubject(false);
  // Alertas
  private cantAlertasMedicamento: BehaviorSubject<number> = new BehaviorSubject(0);
  private cantAlertasDx: BehaviorSubject<number> = new BehaviorSubject(0);
  private alertaDxMed: BehaviorSubject<ValidarRecetaDTO> = new BehaviorSubject(null);
  private validarRecetaAlertas: ValidarRecetaDTO;
  loaderTrabajadorSiniestro = this.trabajadorSiniestroSubject.asObservable();

  constructor(private recetaService: RecetaService) {
    this.lstMedicamentosGlobal = [];
  }

  setTrabajadorSiniestro(value: AfiliadoDTO): void {
    localStorage.setItem(storageKeys.dataEmployee, JSON.stringify(value));
    this.trabajadorSiniestro = value;
    this.trabajadorSiniestroSubject.next(value);
  }

  getTrabajadorSiniestro(): AfiliadoDTO {
    return  this.trabajadorSiniestro || JSON.parse(localStorage.getItem(storageKeys.dataEmployee));
  }

  setTrabajadorSiniestroReceta(value: TrabajadorSiniestroRecetaDTO): void {
    localStorage.setItem(storageKeys.dataReceta, JSON.stringify(value));
    this.trabajadorSiniestroRecetaDTO = value;
    this.trabajadorSiniestroSubject.next(value);
  }

  getTrabajadorSiniestroReceta(): TrabajadorSiniestroRecetaDTO {
    return this.trabajadorSiniestroRecetaDTO || JSON.parse(localStorage.getItem(storageKeys.dataReceta));;
  }

  setMedicamentoTrabajador(value: MedicamentoInterface, ind: number): void {
    let lstMedicamentosSeleccionados: MedicamentoInterface[] = [];
    lstMedicamentosSeleccionados = JSON.parse(localStorage.getItem('lstMedicamentosSeleccionados'));
    if (lstMedicamentosSeleccionados === null) {
      lstMedicamentosSeleccionados = [];
    }
    if (ind !== undefined) {
      this.lstMedicamentosSeleccionadosTrabajador.value[ind].medicamento = value.medicamento;
      this.lstMedicamentosSeleccionadosTrabajador.value[ind].cantidadMedto = value.cantidadMedto;
      this.lstMedicamentosSeleccionadosTrabajador.value[ind].cantDosis = value.cantDosis;
      this.lstMedicamentosSeleccionadosTrabajador.value[ind].presentacion = value.presentacion;
      this.lstMedicamentosSeleccionadosTrabajador.value[ind].cantFrecuencia = value.cantFrecuencia;
      this.lstMedicamentosSeleccionadosTrabajador.value[ind].frecuencia = value.frecuencia;
      this.lstMedicamentosSeleccionadosTrabajador.value[ind].indicaciones = value.indicaciones;
      this.lstMedicamentosSeleccionadosTrabajador.value[ind].frecuenciaDescripcion = value.frecuenciaDescripcion;

      // Editar localstorage
      lstMedicamentosSeleccionados[ind].medicamento = value.medicamento;
      lstMedicamentosSeleccionados[ind].cantidadMedto = value.cantidadMedto;
      lstMedicamentosSeleccionados[ind].cantDosis = value.cantDosis;
      lstMedicamentosSeleccionados[ind].presentacion = value.presentacion;
      lstMedicamentosSeleccionados[ind].cantFrecuencia = value.cantFrecuencia;
      lstMedicamentosSeleccionados[ind].frecuencia = value.frecuencia;
      lstMedicamentosSeleccionados[ind].indicaciones = value.indicaciones;
      lstMedicamentosSeleccionados[ind].frecuenciaDescripcion = value.frecuenciaDescripcion;

      localStorage.setItem('lstMedicamentosSeleccionados', JSON.stringify(lstMedicamentosSeleccionados));

      let objMed = {} as ValidarMedInterface;
      objMed = this.setObjValidarMed(value);
      this.validarRecetaAlertas.medicamentos[ind] = objMed;
    } else {
      this.lstMedicamentosGlobal.push(value);
      this.lstMedicamentosSeleccionadosTrabajador.next(this.lstMedicamentosGlobal);
      // Crear localstorage
      lstMedicamentosSeleccionados.push(value);
      localStorage.setItem('lstMedicamentosSeleccionados', JSON.stringify(lstMedicamentosSeleccionados));
      // Obj para alerta
      let objMed = {} as ValidarMedInterface;
      objMed = this.setObjValidarMed(value);
      this.validarRecetaAlertas.medicamentos.push(objMed);
    }
    this.recetaService.validarReceta(this.validarRecetaAlertas).subscribe(res => {
      this.setAlertasDxMed(res);
      this.setCantAlertasMedicamento(res.alertas.filter(tDx => tDx.tipo === 'Medicamento').length);
    });
    const ttmtoProg = this.lstMedicamentosGlobal.find(cant => cant.cantidadMedto > 1);
    this.ttmtoProlongado.next(ttmtoProg ? true : false);
  }

  public setObjValidarMed(value: MedicamentoInterface): ValidarMedInterface {
    const objMed = {} as ValidarMedInterface;
    objMed.numeroRegistro = value.medicamento.numeroRegistro.toString();
    objMed.nombre = value.medicamento.nombre;
    objMed.cantidadEnvases = value.cantidadMedto;
    objMed.dosisMedicamento = value.presentacion;
    objMed.cantidadDosis = value.cantDosis;
    objMed.frecuenciaMedicamento = value.frecuencia;
    objMed.cantidadFrecuencia = value.cantFrecuencia;
    objMed.indicaciones = value.indicaciones;
    return objMed;
  }

  limpiarMedicamentosSeleccionados(): void {
    this.lstMedicamentosGlobal = [];
    this.lstMedicamentosSeleccionadosTrabajador.next(this.lstMedicamentosGlobal);
  }

  getMedicamentosSeleccionadosTrabajador(): Observable<MedicamentoInterface[]> {
    return this.lstMedicamentosSeleccionadosTrabajador;
  }

  removeMedicamentoTrabajador(ind: number): void {
    this.lstMedicamentosGlobal.splice(ind, 1);
    this.lstMedicamentosSeleccionadosTrabajador.next(this.lstMedicamentosGlobal);
    // Eliminar registro localstorage
    let lstMedicamentosSeleccionados: MedicamentoInterface[] = [];
    lstMedicamentosSeleccionados = JSON.parse(localStorage.getItem('lstMedicamentosSeleccionados'));
    lstMedicamentosSeleccionados.splice(ind, 1);
    localStorage.setItem('lstMedicamentosSeleccionados', JSON.stringify(lstMedicamentosSeleccionados));
    const ttmtoProg = this.lstMedicamentosGlobal.find(cant => cant.cantidadMedto > 1);
    this.ttmtoProlongado.next(ttmtoProg ? true : false);
    this.validarRecetaAlertas.medicamentos.splice(ind, 1);
    this.recetaService.validarReceta(this.validarRecetaAlertas).subscribe(res => {
      this.setAlertasDxMed(res);
      this.setCantAlertasMedicamento(res.alertas.filter(tDx => tDx.tipo === 'Medicamento').length);
    });
  }

  getTtmtoProlongado(): Observable<boolean> {
    return this.ttmtoProlongado;
  }

  getCantAlertasMedicamento(): Observable<number> {
    return this.cantAlertasMedicamento;
  }

  setCantAlertasMedicamento(value: number): void {
    this.cantAlertasMedicamento.next(value);
  }

  getCantAlertasDx(): Observable<number> {
    return this.cantAlertasDx;
  }

  setCantAlertasDx(value: number): void {
    this.cantAlertasDx.next(value);
  }

  getAlertasDxMed(): Observable<ValidarRecetaDTO> {
    return this.alertaDxMed;
  }

  setAlertasDxMed(value: ValidarRecetaDTO): void {
    this.validarRecetaAlertas = value;
    this.alertaDxMed.next(this.validarRecetaAlertas);
  }

  getAlertas(): AlertaInterface[] {
    return this.validarRecetaAlertas.alertas;
  }

  getMedicamentosValidar(): ValidarMedInterface[] {
    return this.validarRecetaAlertas.medicamentos;
  }
}
