import { Component, OnInit, Input } from '@angular/core';
import { RecetaTrabajadorDTO } from 'src/app/dtos/RecetaTrabajadorDTO';
import { AlertaInterface } from 'src/app/interfaces/alertaInterface';

@Component({
  selector: 'app-ver-detalle-alertas-auditor',
  templateUrl: './ver-detalle-alertas-auditor.component.html',
  styleUrls: ['./ver-detalle-alertas-auditor.component.scss']
})
export class VerDetalleAlertasAuditorComponent implements OnInit {

  @Input() recetaTrabajadorDTO: RecetaTrabajadorDTO;

  public alertas = {};

  constructor() { }

  ngOnInit(): void {

  }

  getMensajeAlerta(alerta : AlertaInterface) {
    let mensaje = alerta.alertaMaestro.mensajeAlerta;
    if(alerta.tipo === 'Medicamento') {
      if(mensaje.includes('[') && mensaje.includes(']')) {
        mensaje = mensaje.replace('[NOMBRE_MEDICAMENTO]', '<b>' + alerta.nombreMedicamento + '</b>');
        mensaje = mensaje.replace('[NOMBRE_MEDICAMENTO_1]', '<b>' + alerta.nombreMedicamento + '</b>');
        mensaje = mensaje.replace('[NOMBRE_MEDICAMENTO_2]', '<b>' + alerta.nombreMedicamentoComparado1 + '</b>');
        mensaje = mensaje.replace('[POSOLOGIA]', '<b>' + alerta.frecuencia + '</b>');

        if(alerta.descripcionInteraccionMedicamentosa?.length > 70 && !this.alertas[alerta.id]){
          mensaje = mensaje.replace('[EFECTO]', alerta.descripcionInteraccionMedicamentosa.substr(0, 70) + '...');
        }else{
          mensaje = mensaje.replace('[EFECTO]', alerta.descripcionInteraccionMedicamentosa);
        }
      } else if(alerta.nombreMedicamento != null && alerta.nombreMedicamento != undefined){
        mensaje = '<b>' + alerta.nombreMedicamento + ' - </b>' + mensaje; 
      }
    } else  if(mensaje.includes('[') && mensaje.includes(']')) {
      mensaje = mensaje.replace('[CODIGO_DIAGNOSTICO]', '<b>' + alerta.codigoDiagnostico + '</b>');
      mensaje = mensaje.replace('[DESCRIPCION_DIAGNOSTICO]', '<b>' + alerta.descripcionDiagnostico + '</b>');
    } else if(alerta.codigoDiagnostico != null && alerta.codigoDiagnostico != undefined){
      mensaje = ' <b> ' + alerta.codigoDiagnostico + ' - </b>' + mensaje; 
    }
    return mensaje;
  }

  mostrarMas(id: number){
    this.alertas[id] = true;
  }

  mostrarMenos(id: number){
    this.alertas[id] = false;
  }
}
