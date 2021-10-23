import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
import { FirstRegisterComponent } from '../first-register/first-register.component';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (!this.authService.isAuthenticated && route.component !== LoginComponent && route.component !== FirstRegisterComponent) {
        console.log('Usuário Não Autenticado');

        window.location.href = '/login';

        return false;
      } else if (this.authService.isAuthenticated && (route.component === LoginComponent || route.component === FirstRegisterComponent)) {
        console.log('Usuário Já Está Autenticado');

        if (this.authService.session && this.authService.session.email) {
          window.location.href = '/crud/produto';
        } else {
          window.location.href = '/crud/categoria';
        }

        return false;
      } else {

        if (route.component !== LoginComponent && route.component !== FirstRegisterComponent && this.authService.session) {
          return true;
          // return this.authService.updateToken().pipe(
          //   catchError((err) => {
          //     this.authService.destroySession();
          //     return of(true);
          //   }),
          //   map(() => true)
          // );
        }

        return true;
      }
  }

}
