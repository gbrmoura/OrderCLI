import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ZMenuItems, ZMenuProfile, ZMenuProvider } from 'zmaterial';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements ZMenuProvider {

  public constructor(
    public auth: AuthService
  ) { }

  public get menus(): Observable<ZMenuItems[]> {

    if (this.auth.session) {

      if (this.auth.session.email) {
        return of([
          {
            category: 'Cadastro',
            icon: 'add',
            itens: [
              { label: 'Produto', link: 'crud/product', icon: 'person' },
            ]
          }
        ]);
      }

      return of([
        {
          category: 'Cadastro',
          icon: 'add',
          itens: [
            { label: 'Produto', link: 'crud/product', icon: 'person' },
          ]
        }
      ]);
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
          { icon: 'person', text: `${this.auth.session.nome}` },
        ]
      });
    }

    return of({});
  }

  public logout(): void {
    this.auth.destroySession();
  }

}
