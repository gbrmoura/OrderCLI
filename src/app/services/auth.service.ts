import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { IAPIResponse, iAuth } from '../interfaces';
import { map } from 'rxjs/operators';
import { EApiCrud, EApiCrudFunction, EAuthCrud } from '../enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public session: iAuth | undefined;

  public get isAuthenticated(): boolean {
    return this.session ? true : false;
  }

  public constructor(private http: HttpClient, private router: Router) {
    this.session = this.getSession();
  }

  private getSession(): any {
    return JSON.parse(String(localStorage.getItem('order_session')));
  }

  public startSession(session: any): void {
    localStorage.setItem('order_session', JSON.stringify(session));
    this.session = session;
  }

  public destroySession(): void {
    localStorage.removeItem('order_session');
    this.session = undefined;
    this.router.navigate(['/login']);
  }

  public getAuthHeaders(): HttpHeaders {
    if (this.isAuthenticated) {
      return new HttpHeaders({ Authorization: `Bearer ${(this.session as iAuth).token}` });
    } else {
      return new HttpHeaders();
    }
  }

  public login(object: { login: string, senha: string }): Observable<IAPIResponse> {
    return this.http.post<IAPIResponse>(`${environment.url}Autenticacao/Login`, object);
  }

  public firstRegister(object: { nome: string, login: string, email:string, senha: string }): Observable<IAPIResponse> {
    return this.http.post<IAPIResponse>(`${environment.url}Autenticacao/PrimeiroRegistro`, object);
  }

  public registerUser(object: { nome: string, sobrenome: string, prontuario: string, senha: string, email: string }): Observable<IAPIResponse> {
    return this.http.post<IAPIResponse>(`${environment.url}Autenticacao/Usuario/Registrar`, object, {
      headers: this.getAuthHeaders()
    });
  }

  public forgetPassword(object: { email: string }): Observable<IAPIResponse> {
    return this.http.post<IAPIResponse>(`${environment.url}Autenticacao/Recuperar/Senha`, object);
  }

  public changePassword(object: { email: string, token: string, password: string}): Observable<IAPIResponse> {
    return this.http.post<IAPIResponse>(`${environment.url}Autenticacao/Recuperar/ConfirmarSenha`, object);
  }

  public registerEmployee(object: { nome: string, login: string, senha: string, email: string, previlegio: number }): Observable<IAPIResponse> {
    return this.http.post<IAPIResponse>(`${environment.url}Autenticacao/Funcionario/Registrar`, object, {
      headers: this.getAuthHeaders()
    });
  }

  public list(value: any, crud: EAuthCrud): Observable<IAPIResponse> {
    return this.http.get<IAPIResponse>(`${environment.url}Autenticacao/${crud}/${EApiCrudFunction.Listar}`, {
      headers: this.getAuthHeaders(),
      params: new HttpParams()
        .set('TamanhoPagina', value.TamanhoPagina)
        .set('NumeroPagina', value.NumeroPagina)
        .set('CampoPesquisa', value.CampoPesquisa)
    })
  }

  public update(value: any, crud: EAuthCrud): Observable<IAPIResponse> {
    return this.http.post<IAPIResponse>(`${environment.url}Autenticacao/${crud}/${EApiCrudFunction.Alterar}`, value, {
      headers: this.getAuthHeaders()
    });
  }

  public updateToken(): Observable<IAPIResponse> {

    const object = {
      token: (this.session as iAuth).token,
      refreshToken: (this.session as iAuth).refreshToken
    };

    return this.http.post<IAPIResponse>(`${environment.url}Autenticacao/AtualizarToken`, object, {
      headers: this.getAuthHeaders()
    }).pipe(
      map((res) => {

        if (this.session && res.response) {
          this.session.token = res.response.token;
          this.session.refreshToken = res.response.refreshToken;

          this.startSession(this.session)
        }

        return res;
      })
    );
  }
}
