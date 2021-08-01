import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-empty-confirmacion-success',
  templateUrl: './empty-confirmacion-success.component.html',
  styleUrls: ['./empty-confirmacion-success.component.scss']
})
export class EmptyConfirmacionSuccessComponent {

  @Input() titulo: string;
  @Input() mensaje: string;
  @Input() srcIcon: string = 'assets/icons/confirmed-success.svg';
  @Input() buttonsShow = true;
  @Output() download = new EventEmitter<any>();
  @Output() send = new EventEmitter<any>();

  constructor() {
  }

  onClickDownload() {
    this.download.emit();
  }

  onClickSend() {
    this.send.emit();
  }
}
