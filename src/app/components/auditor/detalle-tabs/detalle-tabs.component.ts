import { Component, Input, OnInit } from '@angular/core';
import { DetalleRecetaTrabajadorDTO } from 'src/app/dtos/DetalleRecetaTrabajadorDTO';
@Component({
  selector: 'app-detalle-tabs',
  templateUrl: './detalle-tabs.component.html',
  styleUrls: ['./detalle-tabs.component.scss'],
})
export class DetalleTabsComponent implements OnInit{

  @Input() setRecetaTrabajadorDTO: DetalleRecetaTrabajadorDTO;

  constructor() { }

  ngOnInit(): void {
  }

  public tieneAnios(fechaNac: string): number {
    if (fechaNac) {
      let age = -1;
      const timeDiff = Math.abs(Date.now() - new Date(fechaNac).getTime());
      age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
      return age;
    }
  }

  public obtenerPosologia(cantDosis: number, dosisMed: string, cantFrecuencia: number, frecuencia: any, indicaciones: string): string {
    let posologia = '';
    if (cantDosis) {
      if (dosisMed && dosisMed === 'NO_APLICA') {
        posologia = cantFrecuencia + ' ' + frecuencia.descripcion + ' - ' + indicaciones;
      } else {
        posologia = cantDosis + ' ' + dosisMed + ' cada ' + cantFrecuencia + ' ' + frecuencia.descripcion + ' - ' + indicaciones;
      }
    }
    return posologia;
  }
}
