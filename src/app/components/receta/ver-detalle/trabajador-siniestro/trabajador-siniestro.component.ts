import { Component, Input, OnInit } from '@angular/core';
import { DetalleRecetaTrabajadorDTO } from 'src/app/dtos/DetalleRecetaTrabajadorDTO';

@Component({
  selector: 'app-ver-detalle-trabajador-siniestro',
  templateUrl: './trabajador-siniestro.component.html',
  styleUrls: ['./trabajador-siniestro.component.scss']
})
export class TrabajadorSiniestroTarjetasComponent implements OnInit {

  @Input()
  setRecetaTrabajadorDTO: DetalleRecetaTrabajadorDTO;

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

}
