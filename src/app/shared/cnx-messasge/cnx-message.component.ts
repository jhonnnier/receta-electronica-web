import {Component} from '@angular/core';
import {Message, PrimeNGConfig} from "primeng/api";
import {alertTypes} from "@shared/constants/alert-types.constants";
import {CnxMessageService} from "@services/shared/cnx-message.service";
import {Utils} from "../../utils/Utils";

@Component({
  selector: 'cnx-message',
  templateUrl: './cnx-message.component.html',
  styleUrls: ['./cnx-message.component.scss']
})
export class CnxMessageComponent {

  type = '';
  life = 6000;
  primeMessage: Message[] = <Message[]>[];
  msgLength = 400;
  showText = false;
  extender = false;
  text = '';
  time: any;
  icon = '';
  private _message = '';

  constructor(
    private primengConfig: PrimeNGConfig,
    private cnxMessageService: CnxMessageService) {
    this.setMessage();
  }

  private setMessage() {
    this.cnxMessageService.send$.subscribe(msg => {
      if (msg) {
        this.type = msg.severity;
        this._message = msg.detail;
        this.life = msg.life;
        this.managementMessage();
      }
    });
  }

  get message() {
    return this._message;
  }

  managementMessage(): void {
    this.text = this.message

    this.automaticClosing();

    if (this.message && this.message.length > this.msgLength) {
      this.extender = true;
      this.onShowText();
    }

    this.setAlertMessage();
    this.setIcon();
  }

  setIcon() {
    switch (this.type) {
      case alertTypes.INFO:
        this.icon = 'pi-info-circle';
        break;

      case alertTypes.SUCCESS:
        this.icon = 'pi-check';
        break;

      case alertTypes.WARNING:
        this.icon = 'pi-info-circle';
        break;

      case alertTypes.ERROR:
        this.icon = 'pi-times-circle';
        break;
    }
  }

  setAlertMessage(): void {
    this.primeMessage = [{severity: this.type, detail: this.text}];
    this.primengConfig.ripple = true;
  }

  onShowText() {
    this.showText = !this.showText;
    this.text = this.message;

    if (this.showText) {
      this.text = Utils.ellipsis(this.text, this.msgLength);
    }
  }

  onClose() {
    this.text = null;
    clearTimeout(this.time);
  }

  automaticClosing() {
    this.time = setTimeout(() => {
      this.onClose();
    }, this.life)
  }
}
