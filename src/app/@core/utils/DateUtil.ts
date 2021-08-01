import {formatDate} from '@angular/common';
import {parse} from 'date-fns';

export class DateUtil {

  static giveFormatToDate(date: string): string {
    try {
      const format = 'dd/MM/yyyy';
      const locale = 'en-US';
      return formatDate(date, format, locale);
    } catch (e) {
      console.log('Erro try');
    }
    return '';
  }

  static convertToDate(date: string): Date {
    return parse(date, 'dd/MM/yyyy', new Date());
  }

  static isDateValid(date: string): boolean {
    const regexp = new RegExp('^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\\d\\d$');
    return regexp.test(date);
  }
}
