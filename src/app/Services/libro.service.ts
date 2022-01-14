import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { libroInput, libroView } from '../Models/libro';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  baseUrl: string;
  constructor(
    private http: HttpClient,
    private handleErrorService: HandleHttpErrorService
  ) {
    this.baseUrl = environment.API_URL;
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
    return this.http.put<libroView>(url, libro).pipe(
      tap(_ => this.handleErrorService.log('datos enviados correctamentes')),
      catchError(this.handleErrorService.handleError<any>('Modificar libro', null))
    );
  }

  delete(libro: libroView | string): Observable<libroView> {
    const id = typeof libro === 'string' ? libro : libro.idLibro;
    return this.http.delete<libroView>(this.baseUrl + 'api/Libro/' + id)
      .pipe(
        tap(_ => this.handleErrorService.log('Eliminado correctamente')),
        catchError(this.handleErrorService.handleError<any>('Elimiar puesto', null))
      );
  }

  // getDatos() {
  //   return new Promise<any>((resolve, reject) => {
  //     setTimeout(() => {
  //       this.prueba().subscribe((data) => {
  //         if (data != null) {
  //           resolve(data);
  //         }
  //         reject(data);
  //       })
  //     }, 1000);
  //   });
  // }

  async getprueba(){
     const request = await this.http.get<libroView[]>(this.baseUrl + 'api/Libro').toPromise();
     return request;
  }
}
