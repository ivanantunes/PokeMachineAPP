import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentSession: any;

  constructor(
    private http: HttpClient,
    private route: Router
  ) {
    this.currentSession = this.getCurrentSession();
  }

  public get isAuthenticated(): boolean {
    return this.currentSession ? true : false;
  }

  public startSession(obj: any): void {
    localStorage.setItem('currentSession', JSON.stringify(obj));
    this.currentSession = obj;
  }

  private getCurrentSession(): any {
    return JSON.parse(localStorage.getItem('currentSession') as any) ;
  }

  public getAuthHeaders(): HttpHeaders {

    if (this.isAuthenticated) {
        return new HttpHeaders({
            TOKEN: this.currentSession.token,
        });
    } else {
        return new HttpHeaders();
    }

}

  public destroyCurrentSession(): void {
    localStorage.removeItem('currentSession');
    this.currentSession = undefined;
    this.route.navigate(['/login']);
  }

  public login(loginObj: any): Observable<any> {
    return this.http.post<any>(`${environment.url}login`, loginObj);
  }

}
