import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { libroInput, libroView } from 'src/app/Models/libro';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { LibroService } from 'src/app/Services/libro.service';
import { AgregarLibrosComponent } from '../agregar-libros/agregar-libros.component';
import { ModificarLibrosComponent } from '../modificar-libros/modificar-libros.component';

@Component({
  selector: 'app-consultar-libros',
  templateUrl: './consultar-libros.component.html',
  styleUrls: ['./consultar-libros.component.css']
})
export class ConsultarLibrosComponent implements OnInit {
  libros: libroView[] = [];
  libro: libroView = new libroView;
  constructor(private librosService: LibroService, private serviceModal: NgbModal,
    private autenticacionService: AuthenticationService,private router: Router) { this.consultarLibros(); }

  ngOnInit() {
    this.consultarLibros();
  }

  consultarLibros() {
    this.librosService.getDatos().then((data) => {
      this.libros = data;
    }).catch((err) => {
      console.log(err);
    })
  }

  modificarlibros(libro: libroView) {

    const messageBox = this.serviceModal.open(ModificarLibrosComponent, { size: 'lx' });
    messageBox.componentInstance.libro = libro;
    messageBox.result.then((result) => {
      if (result) {
        this.libros.forEach(element => {
          if (element.idLibro == result.idLibro) {
            this.libros.splice(this.libros.indexOf(element), 1, result);
          }
        });
      }
    });
  }

  eliminarLibro(libro: libroView) {
    this.librosService.delete(libro).subscribe((data) => {
      if (data != null) {
        this.libros = this.libros.filter((element) =>{
          return element.idLibro != data.idLibro;
        })
        console.log("Elminado");
      }
    })
  }

  agregarLibros() {
    const messageBox = this.serviceModal.open(AgregarLibrosComponent, { size: 'lx' });
    messageBox.componentInstance.libro = new libroInput;
    messageBox.result.then((result) => {
      if (result) {
        this.libros.push(result);
      }
    });
  }

  cerrarSession()
  {
    this.autenticacionService.logout();
    this.router.navigate(['/']);
  }

}
