import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // constructor(private authService: AuthService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // let authToken = this.authService.getToken;

    if (request.url.includes('/users/0/signin')) {
      return next.handle(request);
    }

    // if (!authToken || authToken === null) {
    //   return next.handle(request);
    // };

    const authRequest = request.clone({
      headers: request.headers
        .set('User-Agent', 'angular-app')
        .set('Host', 'localhost:8080')
        .set('Cookie', 'JSESSIONID=63CDB4796F049EDCCA33983EC5A4F095')
        .set('Accept', '*/*')
        .set('Access-Control-Allow-Origin', `localhost:4200`)
    });

    return next.handle(authRequest);
  }
}
