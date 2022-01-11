import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { libroInput, libroView } from 'src/app/Models/libro';
import { LibroService } from 'src/app/Services/libro.service';

@Component({
  selector: 'app-modificar-libros',
  templateUrl: './modificar-libros.component.html',
  styleUrls: ['./modificar-libros.component.css']
})
export class ModificarLibrosComponent implements OnInit {
  formGroup!: FormGroup;
  libroModificado: libroView = new libroView;
  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private librosService: LibroService) { }
  @Input()
  libro: libroView = new libroView;



  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      idLibro: [this.libro.idLibro],
      titulo: [this.libro.titulo, Validators.required],
      autor: [this.libro.autor, Validators.required],
      publicador: [this.libro.publicador, Validators.required],
      genero: [this.libro.genero, Validators.required],
      precio: [this.libro.precio, Validators.required]
    });
  }

  get control() {
    return this.formGroup.controls;
  }

  modificar() {
    if (this.formGroup.invalid) {
      return;
    }
    this.libroModificado = this.formGroup.value;

    this.librosService.put(this.libroModificado).subscribe((data) => {
      if (data == null) {
        return;
      }
      console.log('modificado con exito')
      this.activeModal.close(data);
    });
  }
}
