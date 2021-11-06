import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { IAPIResponse } from '../interfaces';
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
      params: new HttpParams().set('TamanhoPagina', value.TamanhoPagina).set('NumeroPagina', value.NumeroPagina).set('CampoPesquisa', value.CampoPesquisa)
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

  public image(id: number, crud: string): string {
    if (!this.auth.session) {
      return '';
    }

    return `${environment.url}${crud}/${EApiCrudFunction.Imagem}?Codigo=${id}&Token=${this.auth.session.token}&RefreshToken=${this.auth.session.refreshToken}`
  }

}
