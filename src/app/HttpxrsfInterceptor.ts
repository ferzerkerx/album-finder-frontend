import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpXsrfTokenExtractor
} from '@angular/common/http';

@Injectable()
export class HttpXsrfInterceptor implements HttpInterceptor {
  static headerName = 'X-XSRF-TOKEN';
  static xsrfMethods = ['post', 'delete', 'put'];

  constructor(private readonly tokenExtractor: HttpXsrfTokenExtractor) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const requestMethod = HttpXsrfInterceptor.requestMethod(req);

    if (HttpXsrfInterceptor.shouldInterceptRequest(requestMethod)) {
      const token = this.tokenExtractor.getToken();
      if (HttpXsrfInterceptor.shouldAddXsrfToken(token, req)) {
        req = req.clone({
          headers: req.headers.set(HttpXsrfInterceptor.headerName, token)
        });
      }
    }

    req = req.clone({
      withCredentials: true,
      headers: req.headers.set('Content-Type', 'application/json')
    });
    return next.handle(req);
  }

  private static shouldAddXsrfToken(token, req: HttpRequest<any>): boolean {
    return token !== null && !req.headers.has(HttpXsrfInterceptor.headerName);
  }

  private static shouldInterceptRequest(requestMethod): boolean {
    return (
      requestMethod && HttpXsrfInterceptor.xsrfMethods.includes(requestMethod)
    );
  }

  private static requestMethod(req: HttpRequest<any>): string {
    const requestMethod: string = req.method;
    return requestMethod.toLowerCase();
  }
}
