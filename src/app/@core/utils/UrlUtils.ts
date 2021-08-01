import {environment} from '../../../environments/environment';
import {EndpointEnum} from '../enums/EndpointEnum';
export  class UrlUtils {
  static getUrl(endpointEnum: EndpointEnum): string {
    return environment.baseUrl + endpointEnum.valueOf();
  }

  static getUrlBase(): string {
    return environment.baseUrl;
  }
}
