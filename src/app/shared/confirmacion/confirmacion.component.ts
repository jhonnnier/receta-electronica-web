import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-comfirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.scss']
})
export class ConfirmacionComponent implements OnInit {

  titulo: string;
  mensaje: string;
  tituloBotonConfirmar: string;
  tituloBotonRegresar: string;
  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
               private dialogRef: MatDialogRef<ConfirmacionComponent>) { }

  ngOnInit(): void {
    this.titulo =  this.data.titulo;
    this.mensaje =  this.data.mensaje;
    this.tituloBotonConfirmar = this.data.tituloBotonConfirmar;
    this.tituloBotonRegresar = this.data.tituloBotonRegresar;
  }

  cerrarModal(valor: boolean): void{
    this.dialogRef.close({confirmar: valor});
  }

  confirmar(): void {
    this.cerrarModal(true);
  }

  regresar(): void {
    this.cerrarModal(false);
  }

}
