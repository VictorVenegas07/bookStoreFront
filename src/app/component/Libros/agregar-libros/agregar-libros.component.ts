import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { libroInput, libroView } from 'src/app/Models/libro';
import { UsuarioView } from 'src/app/Models/login';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { LibroService } from 'src/app/Services/libro.service';

@Component({
  selector: 'app-agregar-libros',
  templateUrl: './agregar-libros.component.html',
  styleUrls: ['./agregar-libros.component.css']
})
export class AgregarLibrosComponent implements OnInit {

  formGroup!: FormGroup;
  libroModificado: libroInput = new libroInput;
  currentUser: UsuarioView = new UsuarioView; 
  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private librosService:LibroService, private authenticationService: AuthenticationService) {
     this.currentUser = this.authenticationService.currentUserValue;
   }
  libro: libroView = new libroView;


  
  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    
      this.formGroup = this.formBuilder.group({
        titulo:[this.libro.titulo, Validators.required],
        autor:[this.libro.autor, Validators.required],
        publicador:[this.libro.publicador, Validators.required],
        genero:[this.libro.genero, Validators.required],
        precio:[this.libro.precio, Validators.required],
        idUsuario:[this.currentUser.idUser, Validators.required]
       });
  }

  get control() { 
    return this.formGroup.controls;
     }
 
  agregar() {
    if (this.formGroup.invalid) {
      return;
    }
    this.libro = this.formGroup.value;
    this.librosService.post(this.libro).subscribe((data) => {
      if(data==null){
        return;
      }
     console.log('Agregado con exito');
     this.activeModal.close(data);
    });


  
  }
}
