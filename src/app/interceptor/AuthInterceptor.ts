import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        'Content-Type':  'application/json',
        Authorization: 'Basic Q29uZXhpYS4uMjAyMTpDb25leGlhLi4yMDIx',
        'x-content-type-options': 'nosniff',
        'x-xss-protection': '1;mode=block',
        'x-permitted-cross-domain-policies': 'none',
        'content-security-policy': 'default-src'
      },
    });

    return next.handle(request).pipe(
      tap(evt => {

      }),
      catchError(error => {
        console.log(error);
        return throwError(error); // add this line
      }));
  }
}
