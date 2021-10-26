import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
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

}
