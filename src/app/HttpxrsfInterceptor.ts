import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor} from '@angular/common/http';

@Injectable()
export class HttpXsrfInterceptor implements HttpInterceptor {

  static headerName = 'X-XSRF-TOKEN';
  static xsrfMethods = ['post', 'delete', 'put'];

  constructor(private tokenExtractor: HttpXsrfTokenExtractor) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let requestMethod = HttpXsrfInterceptor.requestMethod(req);
    console.log(`requestMethod: ${requestMethod}`);

    if (HttpXsrfInterceptor.shouldInterceptRequest(requestMethod)) {
      let token = this.tokenExtractor.getToken() as string;
      if (HttpXsrfInterceptor.shouldAddXsrfToken(token, req)) {
        req = req.clone({headers: req.headers.set(HttpXsrfInterceptor.headerName, token) });
      }
    }

    req = req.clone({ withCredentials: true });
    return next.handle(req);
  }

  private static shouldAddXsrfToken(token, req: HttpRequest<any>): boolean {
    return token !== null && !req.headers.has(HttpXsrfInterceptor.headerName);
  }

  private static shouldInterceptRequest(requestMethod) : boolean {
    return requestMethod && (HttpXsrfInterceptor.xsrfMethods.includes(requestMethod));
  }

  private static requestMethod(req: HttpRequest<any>): string {
    let requestMethod: string = req.method;
    return requestMethod.toLowerCase();
  }
}
