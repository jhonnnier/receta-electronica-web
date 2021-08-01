import { Component, OnInit, ViewChild } from '@angular/core';
import { ListadoRecetasDetalleComponent } from 'src/app/components/auditor/listado-recetas-detalle/listado-recetas-detalle.component';

@Component({
  selector: 'app-listado-recetas',
  templateUrl: './listado-recetas.component.html',
  styleUrls: ['./listado-recetas.component.scss']
})
export class ListadoRecetasComponent implements OnInit {

  @ViewChild('consultaDetalle', {static: false}) consultaDetalle: ListadoRecetasDetalleComponent;

  public sinResultado: boolean;
  public limpiarResultado: boolean;
  mensajeDeExito: string = '';

  constructor() {
    localStorage.setItem('objBusquedaReceta', null);
  }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.mensajeDeExito = history.state.mensajeDeExito;
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
