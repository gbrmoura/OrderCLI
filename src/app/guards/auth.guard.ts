import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FirstRegisterComponent } from '../first-register/first-register.component';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../services/auth.service';
import { UserComponent } from '../user/user.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (!this.authService.isAuthenticated && route.component !== LoginComponent && route.component !== FirstRegisterComponent && route.component !== UserComponent) {
        console.log('Usuário Não Autenticado');

        window.location.href = '/login';

        return false;
      } else if (this.authService.isAuthenticated && (route.component === LoginComponent || route.component === FirstRegisterComponent || route.component === UserComponent)) {
        console.log('Usuário Já Está Autenticado');

        if (this.authService.session && this.authService.session.email) {
          window.location.href = '/register/users';
        } else {
          window.location.href = '/register/users';
        }

        return false;
      } else {

        if (route.component !== LoginComponent && route.component !== FirstRegisterComponent && route.component !== UserComponent && this.authService.session) {
          return this.authService.updateToken().pipe(
            catchError((err) => {
              console.log('Falha ao Atualizar Token: ', err.error);
              this.authService.destroySession();
              return of(false);
            }),
            map(() => true)
          );
        }

        return true;
      }
  }

}
