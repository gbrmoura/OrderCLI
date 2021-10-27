import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { IAPIResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public constructor(
    private auth: AuthService,
    private http: HttpClient
  ) { }

  // ? Category
  public addCategory(value: any): Observable<IAPIResponse> {
    return this.http.post<IAPIResponse>(`${environment.url}Categoria/Registrar`, value, {
      headers: this.auth.getAuthHeaders()
    });
  }

  public listCategory(value: any): Observable<IAPIResponse> {
    return this.http.get<IAPIResponse>(`${environment.url}Categoria/Listar`, {
      headers: this.auth.getAuthHeaders(),
      params: new HttpParams().set('TamanhoPagina', value.TamanhoPagina).set('NumeroPagina', value.NumeroPagina)
    })
  }

  public updateCategory(value: any): Observable<IAPIResponse> {
    return this.http.post<IAPIResponse>(`${environment.url}Categoria/Alterar`, value, {
      headers: this.auth.getAuthHeaders()
    });
  }

  public deleteCategory(value: any): Observable<IAPIResponse> {
    return this.http.get<IAPIResponse>(`${environment.url}Categoria/Deletar`, {
      headers: this.auth.getAuthHeaders(),
      params: new HttpParams().set('codigo', value.codigo)
    })
  }

 // ? Product
public addProduct(value: any): Observable<IAPIResponse> {
  return this.http.post<IAPIResponse>(`${environment.url}Produto/Registrar`, value, {
    headers: this.auth.getAuthHeaders()
  });
}

public listProduct(value: any): Observable<IAPIResponse> {
  return this.http.get<IAPIResponse>(`${environment.url}Produto/Listar`, {
    headers: this.auth.getAuthHeaders(),
    params: new HttpParams().set('TamanhoPagina', value.TamanhoPagina).set('NumeroPagina', value.NumeroPagina)
  })
}

public updateProduct(value: any): Observable<IAPIResponse> {
  return this.http.post<IAPIResponse>(`${environment.url}Produto/Alterar`, value, {
    headers: this.auth.getAuthHeaders()
  });
}

public deleteProduct(value: any): Observable<IAPIResponse> {
  return this.http.get<IAPIResponse>(`${environment.url}Produto/Deletar`, {
    headers: this.auth.getAuthHeaders(),
    params: new HttpParams().set('codigo', value.codigo)
  })
}

}
