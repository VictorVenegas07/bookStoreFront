import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { UsuarioInput, UsuarioView } from '../Models/login';
import { catchError, tap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<UsuarioView>;
  public currentUser: Observable<UsuarioView>;
  baseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) document: any,
    // @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService){
    this.currentUserSubject = new BehaviorSubject<UsuarioView>(JSON.parse(localStorage.getItem('sesionActual') || '[]'));
    this.currentUser = this.currentUserSubject.asObservable();
    this.baseUrl = "https://localhost:44340/";
  }

  

  login(user: UsuarioInput) {
    return this.http.post<any>(this.baseUrl + 'api/Usuario', user)
      .pipe(tap(user => {
        localStorage.setItem('sesionActual', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }), catchError(this.handleErrorService.handleError<any>('Registrar reserva', null)));
  }

  logout(){
    localStorage.removeItem('sesionActual');
    this.currentUserSubject.next(new UsuarioView());
    }

    public get currentUserValue(): UsuarioView {
      return this.currentUserSubject.value;
    }

}
