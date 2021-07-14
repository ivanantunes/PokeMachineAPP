import { CashMachine } from './../interfaces/CashMachine';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CADAccount, CADFullClient } from '../interfaces';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  public registerFullClient(fullClient: CADFullClient): Observable<any> {
    return this.http.post<any>(`${environment.url}register/fullaccount`, fullClient);
  }

  public registerAccount(account: CADAccount): Observable<any> {
    return this.http.post<any>(`${environment.url}register/account`, account);
  }

  public cashMachine(): Observable<CashMachine[]> {
    return this.http.get<any[]>(`${environment.url}all/cashMachine`);
  }

  public accountInfo(token: string): Observable<any> {
    return this.http.get<any>(`${environment.url}account/info`, {
      headers: new HttpHeaders().set('token', token)
    })
  }

  public logout(): Observable<any> {
    return this.http.get<any>(`${environment.url}logout`, {
      headers: this.auth.getAuthHeaders()
    })
  }

  public debit(value: number): Observable<any> {
    return this.http.post<any>(`${environment.url}transfer/debit`, value, {
      headers: this.auth.getAuthHeaders()
    });
  }

  public credit(value: number): Observable<any> {
    return this.http.post<any>(`${environment.url}transfer/credit`, value, {
      headers: this.auth.getAuthHeaders()
    });
  }

  public transfer(value: any): Observable<any> {
    return this.http.post<any>(`${environment.url}transfer/transfer`, value, {
      headers: this.auth.getAuthHeaders()
    });
  }

}
