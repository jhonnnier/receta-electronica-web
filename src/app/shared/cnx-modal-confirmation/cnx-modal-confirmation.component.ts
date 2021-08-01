import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {PrimeNGConfig} from "primeng/api";
import {I18Service} from "@services/shared/i18.service";

@Component({
  selector: 'cnx-modal-confirmation',
  templateUrl: './cnx-modal-confirmation.component.html',
  styleUrls: ['./cnx-modal-confirmation.component.scss']
})
export class CnxModalConfirmationComponent implements OnInit {
  @Input() display = false;
  @Input() title = '';
  @Input() text = '';
  @Input() btnTextConfirm = 'BOTONES.TITULOS.btnAceptar';
  @Input() btnTextCancel = 'BOTONES.TITULOS.btnCancelar';
  @Input() btnCancelShow = false;
  @Output() confirm = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor(
    private primengConfig: PrimeNGConfig) {
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  onClickConfirm() {
    this.display = false;
    this.confirm.emit();
  }

  onClickCancel() {
    this.display = false;
    this.cancel.emit();
  }
}
