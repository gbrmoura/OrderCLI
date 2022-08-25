import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ZTranslateService } from 'zmaterial';
import { FirstRegisterComponent } from '../first-register/first-register.component';
import { getMenus } from '../functions';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../services/auth.service';
import { UserComponent } from '../user/user.component';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private tService: ZTranslateService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (!this.authService.isAuthenticated && route.component !== LoginComponent && route.component !== FirstRegisterComponent && route.component !== UserComponent && route.component !== ForgetPasswordComponent) {

        window.location.href = '/login';

        return false;
      } else if (this.authService.isAuthenticated && (route.component === LoginComponent || route.component === FirstRegisterComponent || route.component === UserComponent || route.component === ForgetPasswordComponent)) {

        if (this.authService.session && (this.authService.session.email || this.authService.session.prontuario)) {
          window.location.href = '/menu';
        } else {
          window.location.href = '/dashboard';
        }

        return false;
      } else {

        if (route.component !== LoginComponent && route.component !== FirstRegisterComponent && route.component !== UserComponent && route.component !== ForgetPasswordComponent && this.authService.session) {

          return this.authService.updateToken().pipe(
            catchError((err) => {

              this.authService.destroySession();
              return of(false);
            }),
            switchMap(() => {
              if (!route.routeConfig || !route.routeConfig.path || !this.authService.session) {
                return of(false);
              }

              return getMenus(this.authService.session.previlegio, this.authService.session, this.tService).pipe(
                map((menus) => {

                  const blockRouter = menus.find((m) => m.itens.find((i) => i.link === (route.routeConfig as Route).path));

                  if (!blockRouter) {

                    if (this.authService.session && (this.authService.session.email || this.authService.session.prontuario)) {
                      window.location.href = '/menu';
                    } else {
                      window.location.href = '/dashboard';
                    }

                    return false;
                  }

                  return true;
                })
              );

            }),
          );
        }

        return true;
      }
  }

}
