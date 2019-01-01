
//import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { GLOBAL } from '../global';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { Injectable } from '@angular/core';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  readonly URL_API = GLOBAL.url;
  constructor(
      private userService: UserService
      //private localStorage: LocalStorageService,
      //private sessionStorage: SessionStorageService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (!request || !request.url || (/^http/.test(request.url) && !(this.URL_API && request.url.startsWith(this.URL_API)))) {
          return next.handle(request);
      }

      const token = this.userService.getToken();
      if (token) {
          request = request.clone({
              setHeaders: {
                  Authorization: token
              }
          });
      }
      
      return next.handle(request);
  }

}