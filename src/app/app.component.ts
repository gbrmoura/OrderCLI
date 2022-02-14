import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ZMenuItems, ZMenuProfile, ZMenuProvider, ZTranslateService } from 'zmaterial';
import { getMenus } from './functions';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements ZMenuProvider {

  public constructor(
    public auth: AuthService,
    private tService: ZTranslateService
  ) { }

  public get menus(): Observable<ZMenuItems[]> {

    if (this.auth.session) {
      return getMenus(this.auth.session.previlegio, this.auth.session, this.tService);
    }

    return of([]);
  }

  public get profile(): Observable<ZMenuProfile> {

    if (this.auth.session) {

      if (this.auth.session.email) {
        return of({
          descriptions: [
            { icon: 'person', text: `${this.auth.session.nome}` },
            { icon: 'email', text: this.auth.session.email as string },
          ]
        });
      }

      return of({
        descriptions: [
          { icon: 'badge', text: `${this.auth.session.nome}` },
        ]
      });
    }

    return of({});
  }

  public logout(): void {
    this.auth.destroySession();
  }

}
