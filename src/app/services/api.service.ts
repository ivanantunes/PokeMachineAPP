import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CADFullClient } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  public registerFullClient(fullClient: CADFullClient): Observable<any> {

    return this.http.post<any>(`${environment.url}register/fullaccount`, fullClient);

  }

}
