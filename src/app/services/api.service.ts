import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { IAPIResponse, iAuth } from '../interfaces';
import { EApiCrud, EApiCrudFunction } from '../enum/EAPI';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public constructor(
    private auth: AuthService,
    private http: HttpClient
  ) { }

  public insert(value: any, crud: EApiCrud): Observable<IAPIResponse> {
    return this.http.post<IAPIResponse>(`${environment.url}${crud}/${EApiCrudFunction.Registrar}`, value, {
      headers: this.auth.getAuthHeaders()
    });
  }

  public list(value: any, crud: EApiCrud): Observable<IAPIResponse> {
    return this.http.get<IAPIResponse>(`${environment.url}${crud}/${EApiCrudFunction.Listar}`, {
      headers: this.auth.getAuthHeaders(),
      params: new HttpParams()
        .set('TamanhoPagina', value.TamanhoPagina)
        .set('NumeroPagina', value.NumeroPagina)
        .set('CampoPesquisa', value.CampoPesquisa)
    })
  }

  public update(value: any, crud: EApiCrud): Observable<IAPIResponse> {
    return this.http.post<IAPIResponse>(`${environment.url}${crud}/${EApiCrudFunction.Alterar}`, value, {
      headers: this.auth.getAuthHeaders()
    });
  }

  public delete(value: any, crud: EApiCrud): Observable<IAPIResponse> {
    return this.http.get<IAPIResponse>(`${environment.url}${crud}/${EApiCrudFunction.Deletar}`, {
      headers: this.auth.getAuthHeaders(),
      params: new HttpParams().set('codigo', value.codigo)
    })
  }

  public get(value: any, crud: EApiCrud): Observable<IAPIResponse> {
    return this.http.get<IAPIResponse>(`${environment.url}${crud}/${EApiCrudFunction.Consultar}`, {
      headers: this.auth.getAuthHeaders(),
      params: new HttpParams().set('codigo', value)
    })
  }

  public image(id: number, crud: string): string {
    if (!this.auth.session) {
      return '';
    }

    return `${environment.url}${crud}/${EApiCrudFunction.Imagem}?Codigo=${id}&Token=${this.auth.session.token}`
  }

  public menu(value: any): Observable<IAPIResponse> {
    return this.http.get<IAPIResponse>(`${environment.url}Cardapio`, {
      headers: this.auth.getAuthHeaders(),
      params: new HttpParams()
        .set('TamanhoPagina', value.TamanhoPagina)
        .set('NumeroPagina', value.NumeroPagina)
        .set('CampoPesquisa', value.CampoPesquisa)
        // .set('UsuarioCodigo', (this.auth.session as iAuth).codigo)
    })
  }

  public favorite(value: any): Observable<IAPIResponse> {
    return this.http.post<IAPIResponse>(`${environment.url}Cardapio/Favorito`, value, {
      headers: this.auth.getAuthHeaders()
    });
  }

  public control(value: any): Observable<IAPIResponse> {
    return this.http.post<IAPIResponse>(`${environment.url}${EApiCrud.Estoque}/Controle`, value, {
      headers: this.auth.getAuthHeaders()
    });
  }

  // order
  public cancel(value: any): Observable<IAPIResponse> {
    return this.http.get<IAPIResponse>(`${environment.url}${EApiCrud.Pedido}/Cancelar`, {
      headers: this.auth.getAuthHeaders(),
      params: new HttpParams().set('codigo', value)
    });
  }

  public withdraw(value: any): Observable<IAPIResponse> {
    return this.http.get<IAPIResponse>(`${environment.url}${EApiCrud.Pedido}/Retirar`, {
      headers: this.auth.getAuthHeaders(),
      params: new HttpParams().set('codigo', value)
    });
  }

}
