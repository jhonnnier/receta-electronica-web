import { Component, Input, OnInit } from '@angular/core';
import { RecetaTrabajadorDTO } from 'src/app/dtos/RecetaTrabajadorDTO';

@Component({
  selector: 'app-ver-detalle-diagnosticos-medicamentos',
  templateUrl: './diagnosticos-medicamentos.component.html',
  styleUrls: ['./diagnosticos-medicamentos.component.scss']
})
export class DiagnosticosMedicamentosComponent implements OnInit {

  @Input()
  setRecetaTrabajadorDTO: RecetaTrabajadorDTO;

  constructor() { }

  ngOnInit(): void {
  }

  public obtenerPosologia(cantDosis: number, dosisMed: string, cantFrecuencia: number, frecuencia: string, indicaciones: string): string {
    let posologia = '';
    if (cantDosis) {
      if (dosisMed && dosisMed === 'NO_APLICA') {
        posologia = cantFrecuencia + ' ' + frecuencia + ' - ' + indicaciones;
      } else {
        posologia = cantDosis + ' ' + dosisMed + ' cada ' + cantFrecuencia + ' ' + frecuencia + ' - ' + indicaciones;
      }
    }
    return posologia;
  }

}
