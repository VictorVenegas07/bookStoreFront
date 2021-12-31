import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { ConsultarLibrosComponent } from './component/Libros/consultar-libros/consultar-libros.component';
import { AgregarLibrosComponent } from './component/Libros/agregar-libros/agregar-libros.component';
import { ModificarLibrosComponent } from './component/Libros/modificar-libros/modificar-libros.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertModalComponent } from './@base/alert-modal/alert-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './Services/jwt.interceptor';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationService } from './Services/authentication.service';
import { LibroService } from './Services/libro.service';
import { AuthLoginGuard } from './Services/auth-login.guard';
import { AuthConsultasGuard } from './Services/auth-consultas.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'consultar-libros', component: ConsultarLibrosComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConsultarLibrosComponent,
    AgregarLibrosComponent,
    ModificarLibrosComponent,
    AlertModalComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'consultar-libros', component: ConsultarLibrosComponent, canActivate: [AuthLoginGuard] }
    ], { relativeLinkResolution: 'legacy' })
  ],
  providers: [AuthenticationService, LibroService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
     ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
