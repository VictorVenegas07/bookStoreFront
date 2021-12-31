import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { UsuarioView } from '../Models/login';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }
  currentUser: UsuarioView = new UsuarioView;
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  this.currentUser = this.authenticationService.currentUserValue;
    if (this.currentUser && this.currentUser.token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${this.currentUser.token}` }
      });
    }
    return next.handle(request);
  }
}
