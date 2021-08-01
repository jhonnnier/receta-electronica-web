import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalComponent } from 'src/app/components/genericos/modal/modal.component';
import { DiagnosticosComponent } from 'src/app/components/receta/diagnosticos/diagnosticos.component';
import { MedicamentosModalComponent } from 'src/app/components/receta/medicamentos/modal/medicamentos/medicamentos.modal.component';
import { TrabajadorSiniestroRecetaDTO } from 'src/app/dtos/TrabajadorSiniestroRecetaDTO';
import { FinalizarRecetaInterface } from 'src/app/interfaces/finalizarRecetaInterface';
import { MedicamentoInterface } from 'src/app/interfaces/medicamentoInterface';
import { TrabajadorSiniestroService } from 'src/app/services/afiliado/trabajador-siniestro.service';
import { RecetaService } from 'src/app/services/receta/receta.service';
import {FrecuenciaMedicamento} from '../../dtos/FrecuenciaMedicamento';
import { AlertaInterface } from 'src/app/interfaces/alertaInterface';
import {UserDetailService} from "@services/auth/user-detail.service";
import {AuthorizationService} from "@services/auth/authorization.service";


@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.scss']
})
export class RecetaComponent implements OnInit, OnDestroy {

  @ViewChild('dxComponent', {static: false}) dxComponent: DiagnosticosComponent;
  private unsubscribe$ = new Subject<void>();
  public cantDx = 0;
  public cantAlertaDx = 0;
  public cantMedto = 0;
  public trabajadorSiniestroRecetaDTO: TrabajadorSiniestroRecetaDTO;
  public recetaForm: FormGroup;
  public btnShowHide = true;
  public showMedtoRequerido = false;
  public recetaCreada = false;
  public showPassInvalid = false;
  public disableButton = false;
  isSubmitted = false;

  private medtoSeleccionadoSource = new BehaviorSubject<MedicamentoInterface[]>([]);
  public lstMedtosSeleccionados$ = this.medtoSeleccionadoSource.asObservable();

  constructor(public trabajadorSiniestroService: TrabajadorSiniestroService,
              private dialog: MatDialog, private fb: FormBuilder, private recetaService: RecetaService,
              private locationVar: Location,
              private userDetailService: UserDetailService,
              private authorizationService: AuthorizationService) {
    this.trabajadorSiniestroRecetaDTO = this.trabajadorSiniestroService.getTrabajadorSiniestroReceta();
    this.limpiarCache();
    this.establecerFormulario();
    this.btnShowHide = true;
    this.showMedtoRequerido = false;
    this.recetaCreada = false;
    this.showPassInvalid = false;
  }

  ngOnInit(): void {
    window.scroll(0, 0);
  }

  agregarMedicamento(): void {
    this.dialog.open(MedicamentosModalComponent, { disableClose: true });
  }

  editarMedicamento(medtoEditar: MedicamentoInterface, ind: number): void {
    medtoEditar.ind = ind;
    this.dialog.open(MedicamentosModalComponent, { disableClose: true, data: medtoEditar });
  }

  borrarMedicamento(indexDx: number): void {
    if (indexDx >= 0) {
      this.trabajadorSiniestroService.removeMedicamentoTrabajador(indexDx);
    }
  }

  establecerFormulario(): void {
    this.recetaForm = this.fb.group({
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      contrasenia: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.limpiarCache();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.btnShowHide = true;
    this.trabajadorSiniestroService.limpiarMedicamentosSeleccionados();
  }

  private limpiarCache(): void{
    localStorage.setItem('lstMedicamentosSeleccionados', null);
  }

  mostrarPass(): void {
    this.btnShowHide = !this.btnShowHide;
  }

  async userValidate(): Promise<boolean> {
    const contrasenia = this.recetaForm.get('contrasenia').value;
    const username = this.userDetailService.usuario.username;

    try {
      const user = await this.authorizationService.signIn(username, contrasenia);

      return user ? true : false;
    } catch (e) {
    }

    return false;
  }

  async crearReceta(): Promise<void> {
    this.showPassInvalid = false;

    if (!await this.userValidate()) {
      this.showPassInvalid = true;
      return;
    }

    this.isSubmitted = true;
    this.dxComponent.isValidComponent();
    const lstMedicamentosSeleccionados = JSON.parse(localStorage.getItem('lstMedicamentosSeleccionados'));
    if (this.recetaForm.valid &&
      !this.dxComponent.isValidComponent() &&
      lstMedicamentosSeleccionados !== undefined &&
      lstMedicamentosSeleccionados.length > 0) {
        this.disableButton = true;
        const objReceta = {} as FinalizarRecetaInterface;
        // tslint:disable-next-line: deprecation
        this.trabajadorSiniestroService.getTtmtoProlongado().pipe(takeUntil(this.unsubscribe$)).subscribe(tto => {
          objReceta.correoNotificacion = this.recetaForm.get('correo').value;
          objReceta.tipoTratamiento = tto ? 'PROLONGADO' : 'NORMAL';
          objReceta.medicamentos = this.getMedtosSeleccionados(lstMedicamentosSeleccionados);
          objReceta.diagnosticos = this.dxComponent.diagnosticosSeleccionados;
          objReceta.medico = this.getMedicoAutenticado();
          objReceta.siniestro = this.getSiniestroAfiliadoSeleccionado(this.trabajadorSiniestroRecetaDTO);
          objReceta.alertasReceta = [];
          objReceta.alertasReceta = this.trabajadorSiniestroService.getAlertas();
        });
        // tslint:disable-next-line: deprecation
        this.recetaService.crearReceta(objReceta).pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
          this.recetaCreada = true;
          this.disableButton = false;
          this.trabajadorSiniestroService.setCantAlertasDx(0);
          this.trabajadorSiniestroService.setCantAlertasMedicamento(0);
        }, err => {
          if (err?.error?.message !== '' && err?.error?.message.includes('RE017')) {
            this.showPassInvalid = true;
            this.disableButton = false;
          }
        });
    } else {
      this.showMedtoRequerido = true;
      return Object.values(this.recetaForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  private getMedicoAutenticado(): {} {
    return {
      nombreCompleto: 'Alfredo Arias',
      nroMatricula: '45663366d',
      idProfesional: '45663366d',
      user: {
        username: 'medico@art.com',
        password: this.recetaForm.get('contrasenia').value
      }
    };
  }

  private getMedtosSeleccionados(lstMedtosSeleccionados: any): Array<typeof ObjMedto> {
    const ObjMedto = {
      troquel: '',
      cantidadEnvases: -1,
      dosisMedicamento: '',
      cantidadDosis: -1,
      frecuenciaMedicamento: {
        codigo: ''
      },
      cantidadFrecuencia: -1,
      indicaciones: ''
    };
    const lstObjMedto: Array<typeof ObjMedto> = [];
    lstMedtosSeleccionados.forEach(medto => {
      const objMedto = {} as typeof ObjMedto;
      objMedto.troquel = medto.medicamento.troquel;
      objMedto.cantidadEnvases = medto.cantidadMedto;
      objMedto.dosisMedicamento = medto.presentacion.toUpperCase();
      objMedto.cantidadDosis = medto.cantDosis;
      objMedto.frecuenciaMedicamento = this.getFrecuenciaObject(medto.frecuencia);
      objMedto.cantidadFrecuencia = medto.cantFrecuencia;
      objMedto.indicaciones = medto.indicaciones;
      lstObjMedto.push(objMedto);
    });
    return lstObjMedto;
  }

  private getFrecuenciaObject(codigo: string ): FrecuenciaMedicamento {
    const frecuenciaMedicamento: FrecuenciaMedicamento = new FrecuenciaMedicamento();
    frecuenciaMedicamento.codigo = codigo;
    return frecuenciaMedicamento;
  }

  private getSiniestroAfiliadoSeleccionado(trabajadorSiniestroRecetaDTO: TrabajadorSiniestroRecetaDTO): {} {
    const ObjSiniestroAfiliado = {
      numeroSiniestro: trabajadorSiniestroRecetaDTO.siniestro.numeroSiniestro,
      afiliado: {
          tipoDocumento: trabajadorSiniestroRecetaDTO.afiliado.tipoDocumento,
          documento: trabajadorSiniestroRecetaDTO.afiliado.documento,
          fechaNacimiento: trabajadorSiniestroRecetaDTO.afiliado.fechaNacimiento,
          sexo: trabajadorSiniestroRecetaDTO.afiliado.sexo,
          email: trabajadorSiniestroRecetaDTO.afiliado.email,
          telefono: trabajadorSiniestroRecetaDTO.afiliado.telefono
      }
    };
    return ObjSiniestroAfiliado;
  }

  get correoInvalido(): boolean {
    return this.recetaForm.get('correo').invalid && this.recetaForm.get('correo').touched;
  }

  get passInvalido(): boolean {
    return this.recetaForm.get('contrasenia').invalid && this.recetaForm.get('contrasenia').touched;
  }

  cancelarReceta(): void {
    const lstMedicamentosSeleccionados = JSON.parse(localStorage.getItem('lstMedicamentosSeleccionados'));
    if (!this.dxComponent.isValidComponent() ||
      (lstMedicamentosSeleccionados !== null &&
      lstMedicamentosSeleccionados.length > 0)) {
        const objModal = {
          textTitle: 'RECETA.cancelarRecetaTitulo',
          textDescription: 'RECETA.cancelarRecetaDescripcion',
          textButton: 'RECETA.cancelarRecetaBoton',
          textLink: 'RECETA.cancelarRecetaLink'
        };
        this.dialog.open(ModalComponent, { disableClose: true, data: objModal });
    } else {
      this.locationVar.back();
    }
  }

  hasErrorControl(controlName: string, errorCode: string): boolean {
    return this.recetaForm.controls[controlName].hasError(errorCode) && this.isSubmitted;
  }

  getMensajeAlerta(alerta : AlertaInterface) {
    let mensaje = alerta.alertaMaestro.mensajeAlerta;
    if(mensaje.includes('[') && mensaje.includes(']')) {
      mensaje = mensaje.replace('[NOMBRE_MEDICAMENTO]', '<b>' + alerta.nombreMedicamento + '</b>');
      mensaje = mensaje.replace('[NOMBRE_MEDICAMENTO_1]', '<b>' + alerta.nombreMedicamento + '</b>');
      mensaje = mensaje.replace('[NOMBRE_MEDICAMENTO_2]', '<b>' + alerta.nombreMedicamentoComparado1 + '</b>');
      mensaje = mensaje.replace('[POSOLOGIA]', '<b>' + alerta.frecuencia + '</b>');
      mensaje = mensaje.replace('[EFECTO]', alerta.descripcionInteraccionMedicamentosa);
    } else if(alerta.nombreMedicamento != null && alerta.nombreMedicamento != undefined){
      mensaje = '<b>' + alerta.nombreMedicamento + ' - </b>' + mensaje; 
    }
    return mensaje;
  }

  backClicked(): void {
    this.locationVar.back();
  }

  titulo(str) : string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
