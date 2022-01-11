import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { UsuarioInput } from 'src/app/Models/login';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  returnUrl: String = "";
  submitted: boolean = false;
  loading: boolean = false;
  user: UsuarioInput;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal
  ) {
    this.user = new UsuarioInput();
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate([""]);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }
  
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.user = this.loginForm.value;
    
    this.authenticationService.login(this.user).pipe(first()).subscribe((data) => {
          this.router.navigate(["/consultar-libros"]);
        },(error) => {
          const modalRef = this.modalService.open(AlertModalComponent);
          modalRef.componentInstance.title = "Acceso Denegado";
          modalRef.componentInstance.message = "Usuario o Contraseña Erroneas";
          this.loading = false;
        }
      );
  }
}
