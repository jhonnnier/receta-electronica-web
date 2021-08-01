import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {alertTypes} from "@shared/constants/alert-types.constants";

@Injectable({
  providedIn: 'root'
})
export class CnxMessageService {

  private msg = new Subject<any>();
  send$ = this.msg.asObservable();

  constructor() {
  }

  /**
   *
   * @param detail Texto del mensaje
   * @param life tiempo en milisegundos de duración
   * @param autoClosing true = cierra el mensaje, false = permanece abierto
   */
  info(detail: string, life = null): void {
    this.mapMessage(alertTypes.INFO, detail, life);
  }

  /**
   *
   * @param detail Texto del mensaje
   * @param life tiempo en milisegundos de duración
   * @param autoClosing true = cierra el mensaje, false = permanece abierto
   */
  success(detail: string, life = null): void {
    this.mapMessage(alertTypes.SUCCESS, detail, life);
  }

  /**
   *
   * @param detail Texto del mensaje
   * @param life tiempo en milisegundos de duración
   * @param autoClosing true = cierra el mensaje, false = permanece abierto
   */
  warning(detail: string, life = null): void {
    this.mapMessage(alertTypes.WARNING, detail, life);
  }

  /**
   *
   * @param detail Texto del mensaje
   * @param life tiempo en milisegundos de duración
   * @param autoClosing true = cierra el mensaje, false = permanece abierto
   */
  error(detail: string, life = null): void {
    this.mapMessage(alertTypes.ERROR, detail, life);
  }

  mapMessage(severity: string, detail: string, life: number): void {
    const msg = {severity, detail, life: life || 7000}
    this.msgShow(msg);
  }

  msgShow(msg): void {
    this.msg.next(msg);
  }
}
