import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../servicios/login.service';

@Injectable({
  providedIn: 'root'
})
export class AccesoModuloGuard implements CanActivateChild  {

  constructor(
    private authService: LoginService,
    private router: Router
  ){}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const codigoModulo = route.data.codigoModulo;
    const index = this.authService.validarPermisoModulo(codigoModulo);

    if(!index){
      this.router.navigate(['/'])
      return false;
    }
    return true;
  }
  
}
