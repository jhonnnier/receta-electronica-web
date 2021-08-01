import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ConsultaDetalleComponent } from 'src/app/components/trabajador/consulta-detalle/consulta-detalle.component';
import { FinanciadorDTO } from 'src/app/dtos/FinanciadorDTO';

@Component({
  selector: 'app-consulta-trabajador',
  templateUrl: './consulta-trabajador.component.html',
  styleUrls: ['./consulta-trabajador.component.scss']
})
export class ConsultaTrabajadorComponent implements OnInit {

  @ViewChild('consultaDetalle', {static: false}) consultaDetalle: ConsultaDetalleComponent;

  public financiadorDTO: FinanciadorDTO;
  public sinResultado: boolean;
  public limpiarResultado: boolean;

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 80;

  constructor() { }

  ngOnInit(): void {
    window.scroll(0, 0);
  }

  getLstAfiliados(financiadorDTO: FinanciadorDTO): void {
    this.consultaDetalle.getListado(financiadorDTO);
    if (financiadorDTO !== null && financiadorDTO.cantidadAfiliados >= 0) {
      this.consultaDetalle.sinResultado = financiadorDTO.cantidadAfiliados === 0 ? true : false;
    } else {
      this.consultaDetalle.sinResultado = false;
    }
    this.consultaDetalle.limpiarResultado = financiadorDTO === null ? true : false;
  }

}
