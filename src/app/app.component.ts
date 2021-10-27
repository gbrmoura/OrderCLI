import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ZMenuItems, ZMenuProfile, ZMenuProvider, ZTranslateService } from 'zmaterial';
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

      if (this.auth.session.email) {
        return of([
          {
            category: this.tService.t('cat_register'),
            icon: 'add',
            itens: []
          }
        ]);
      }

      const menu = [
        {
          category: this.tService.t('cat_register'),
          icon: 'add',
          itens: [
            { label: this.tService.t('itn_category'), link: 'register/category', icon: 'category' },
            { label: this.tService.t('itn_produtct'), link: 'register/product', icon: 'inventory_2' },
          ]
        }
      ];

      if (this.auth.session.previlegio === 0) {
        menu[0].itens.push({ label: this.tService.t('itn_users'), link: 'register/users', icon: 'person' });
      }

      return of(menu);
    }

    return of([]);
  }

  public get profile(): Observable<ZMenuProfile> {

    if (this.auth.session) {

      if (this.auth.session.email) {
        return of({
          descriptions: [
            { icon: 'person', text: `${this.auth.session.nome} ${this.auth.session.sobrenome}` },
            { icon: 'email', text: this.auth.session.email as string },
            { icon: 'badge', text: this.auth.session.prontuario as string },
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
