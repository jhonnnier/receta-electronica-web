import { Component, Input, OnInit } from '@angular/core';
import { TrabajadorSiniestroRecetaDTO } from 'src/app/dtos/TrabajadorSiniestroRecetaDTO';
import {Location} from '@angular/common';
import { AfiliadoService } from 'src/app/services/afiliado/afiliado.service'

@Component({
  selector: 'app-receta-encabezado',
  templateUrl: './receta-encabezado.component.html',
  styleUrls: ['./receta-encabezado.component.scss']
})
export class RecetaEncabezadoComponent implements OnInit {

  @Input()
  setTrabajadorSiniestroReceta: TrabajadorSiniestroRecetaDTO;

  constructor(private locationVar: Location,
              public afiliadoServices: AfiliadoService) { }

  ngOnInit(): void {
  }

  backClicked(): void {
    this.locationVar.back();
  }

}
