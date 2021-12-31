import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

@Injectable({
  providedIn: 'root'
})
export class HandleHttpErrorService {
  constructor(private serviceModal:NgbModal) { }
  public handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      if (error.status == "400") {
        
        this.mostrarError400(error);
      }
      
      console.error(error);
      return of(result as T);
    };
  }
  public log(message: string) {
    const messageBox = this.serviceModal.open(AlertModalComponent);
    messageBox.componentInstance.titulo = "Resultado Operación";
    messageBox.componentInstance.mensaje = message;
    console.log(message);
  }
  
  public console(message: string) {
    console.log(message);
  }

  private mostrarError400(error: any): void {
    console.error(error);
    let contadorValidaciones: number = 0;
    let mensajeValidaciones: string =
    `Señor(a) usuario(a), se han presentado algunos errores de validación, por favor revíselos y vuelva a realizar la 
    operación.<br/><br/>`;
    for (const prop in error.error.errors) {
      contadorValidaciones++;
      mensajeValidaciones += `<strong>${contadorValidaciones}. ${prop}:</strong>`;
      error.error.errors[prop].forEach((element: any) => {
        mensajeValidaciones += `<br/> - ${element}`;
      });
      mensajeValidaciones += `<br/>`;
    }
    
    const messageBox = this.serviceModal.open(AlertModalComponent);
    messageBox.componentInstance.titulo = "Resultado Operación";
    messageBox.componentInstance.mensaje = mensajeValidaciones;
  }
}