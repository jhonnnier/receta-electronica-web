import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  // @Input() mensaje;
  @Input() tipoAlerta;
  @Input() mostrarBotonCerrar = true;
  @Output() reset = new EventEmitter<any>();
  claseContainer: string;
  esMostrarMas: boolean = true;
  mensajeOriginal;
  renderizarBotonExpandir: boolean = false;
  tamanioMinimo = 400;
  private _mensaje = '';

  constructor() {
  }


  get mensaje() {
    return this._mensaje;
  }

  @Input()
  set mensaje(val) {
    this._mensaje = ''

    if (val) {
      this._mensaje = val;
    }
  }


  ngOnInit(): void {
    if (!this.mensaje) {
      this.mensaje = '';
    }
    this.mensajeOriginal = this.mensaje;
    this.mostrarBotonExpandir(this.mensaje);
    if ('E' === this.tipoAlerta) {
      this.claseContainer = 'containerError';
      return;
    }

    if ('S' === this.tipoAlerta) {
      this.claseContainer = 'containerSucces';
      return;
    }

    if ('I' === this.tipoAlerta) {
      this.claseContainer = 'containerInfo';
      return;
    }

    if ('W' === this.tipoAlerta) {
      this.claseContainer = 'containerWarning';
      return;
    }

    this.claseContainer = 'containerSucces';
  }

  cerrarAlerta(): void {
    this.mensaje = '';
    this.reset.emit();
  }

  clickExpandir(): void {
    this.esMostrarMas = !this.esMostrarMas;

    if (!this.esMostrarMas) {
      this.mensaje = this.mensajeOriginal.substring(0, this.mensajeOriginal.length);
      return;
    }
    this.mensaje = this.mensajeOriginal.substring(0, this.tamanioMinimo) + '...';
  }

  mostrarBotonExpandir(mensaje: string): void {
    if (mensaje.length >= this.tamanioMinimo) {
      this.renderizarBotonExpandir = true;
      this.mensaje = this.mensajeOriginal.substring(0, this.tamanioMinimo) + '...';
    }
  }
}
