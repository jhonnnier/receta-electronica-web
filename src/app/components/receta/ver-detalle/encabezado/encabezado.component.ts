import { Component, Input, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { RecetaTrabajadorDTO } from 'src/app/dtos/RecetaTrabajadorDTO';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-ver-detalle-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss'],
  animations: [
    trigger('fade', [
      transition('true => false', [
        animate(1000, style({ opacity: 0, display: 'none' }))
      ])
    ])
  ]
})
export class EncabezadoComponent implements OnInit {

  @Input()
  setRecetaTrabajadorDTO: RecetaTrabajadorDTO;
  @Input()
  showMessage = false;
  @Input()
  timeOut = false;
  @Input()
  correoActualizado = '';
  @Input()
  showMessageError = false;
  @Input()
  msgCorreoError = '';

  constructor(private locationVar: Location) { }

  ngOnInit(): void {
    this.showMessage = false;
    this.showMessageError = false;
    this.timeOut = false;
    this.correoActualizado = '';
  }

  backClicked(): any {
    this.locationVar.back();
  }

  cerrarAlerta(): void {
    this.showMessage = false;
    this.showMessageError = false;
    this.timeOut = true;
  }
}
