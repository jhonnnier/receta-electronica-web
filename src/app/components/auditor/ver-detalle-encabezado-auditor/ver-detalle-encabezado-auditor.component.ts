import { Component, Input, OnInit } from '@angular/core';
import { DetalleRecetaTrabajadorDTO } from 'src/app/dtos/DetalleRecetaTrabajadorDTO';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ver-detalle-encabezado-auditor',
  templateUrl: './ver-detalle-encabezado-auditor.component.html',
  styleUrls: ['./ver-detalle-encabezado-auditor.component.scss']
})
export class VerDetalleEncabezadoAuditorComponent implements OnInit {

  @Input() setDetalleReceta: DetalleRecetaTrabajadorDTO;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  backClicked(): void {
    this.router.navigate(['pages/auditor/listadoReceta'], { state: {} });
  }

}
