import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class I18Service {
  private _i18: any;

  constructor(private httpClient: HttpClient) {
  }

  async getI18(language: string): Promise<any> {
    const json = `assets/i18n/${language}.json`;
    return await this.httpClient.get<any>(json).toPromise();
  }

  get i18(): any {
    return this._i18;
  }

  set i18(val) {
    this._i18 = val;
  }
}
