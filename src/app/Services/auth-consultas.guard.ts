import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthConsultasGuard implements CanActivate {
  constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}
    

  canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot){
    const currentUser = this.authenticationService.currentUserValue;
    if(currentUser == null)
    {
      return true
    }
    this.router.navigate(['/consultar-libros'], { queryParams: { returnUrl: state.url } });
    return false;
  }
  
}
