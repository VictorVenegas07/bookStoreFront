import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { libroInput, libroView } from '../Models/libro';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  baseUrl: string;
  constructor(
    private http: HttpClient,
    // @Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService
 ) 
  {
    this.baseUrl = "https://localhost:44340/"; 
  }

  get(): Observable<libroView[]> {
    return this.http.get<libroView[]>(this.baseUrl + 'api/Libro').pipe(
      tap(_ => this.handleErrorService.console('mostrados correctamentes')),
      catchError(this.handleErrorService.handleError<any>('consular libro', null))
    );
  }

  post(libro: libroInput): Observable<libroInput> {
    return this.http.post<libroInput>(this.baseUrl + 'api/Libro', libro).pipe(
      tap(_ => this.handleErrorService.log('datos enviados correctamentes')),
      catchError(this.handleErrorService.handleError<any>('Agregar libro', null))
    );
  }

  put(libro: libroView): Observable<libroView> {
    const url = `${this.baseUrl}api/Libro/${libro.idLibro}`;
    return this.http.put<libroView>(url , libro).pipe(
      tap(_ => this.handleErrorService.log('datos enviados correctamentes')),
      catchError(this.handleErrorService.handleError<any>('Modificar libro', null))
    );
  }

  delete(libro: libroView| string): Observable<libroView> {
    const id = typeof libro === 'string' ? libro : libro.idLibro;
    return this.http.delete<libroView>(this.baseUrl + 'api/Libro/'+ id)
    .pipe(
      tap(_ => this.handleErrorService.log('Eliminado correctamente')),
      catchError(this.handleErrorService.handleError<any>('Elimiar puesto', null))
    );
  }
}
