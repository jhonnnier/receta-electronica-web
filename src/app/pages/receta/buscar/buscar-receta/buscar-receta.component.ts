import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ConsultaDetalleRecetaComponent } from 'src/app/components/receta/buscar/consulta-detalle-receta/consulta-detalle-receta.component';

@Component({
  selector: 'app-buscar-receta',
  templateUrl: './buscar-receta.component.html',
  styleUrls: ['./buscar-receta.component.scss']
})
export class BuscarRecetaComponent implements OnInit {

  @ViewChild('consultaDetalle', {static: false}) consultaDetalle: ConsultaDetalleRecetaComponent;

  public sinResultado: boolean;
  public limpiarResultado: boolean;

  constructor() {
    localStorage.setItem('objBusquedaReceta', null);
  }

  ngOnInit(): void {
    window.scroll(0, 0);
  }

  getLstRecetas(recetaTrabajadorDTO: any): void {
    this.consultaDetalle.getListado(recetaTrabajadorDTO !== null ? recetaTrabajadorDTO : []);
    if (recetaTrabajadorDTO !== null && recetaTrabajadorDTO.contentList.length >= 0) {
    } else {
      this.consultaDetalle.sinResultado = true;
    }
    this.consultaDetalle.limpiarResultado = recetaTrabajadorDTO === null ? true : false;
  }

}
