import { Injectable } from '@angular/core';
import IAuthLoginParams from '../interfaces/jobsAPI/requests/IAuthLoginParams';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import IAuthLoginResponse from '../interfaces/jobsAPI/responses/IAuthLoginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  loginUrl = "http://localhost:3000/auth/login"
  headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

  login({username, password} : IAuthLoginParams) : Observable<string | null> {

    // check length
    const body = new HttpParams()
      .set('username', username)
      .set('password', password)

    return this.http
      .post<IAuthLoginResponse>(this.loginUrl, body, {headers : this.headers})
      .pipe(
        tap(token => this.setToken(token.token)),
        map(response => response.token)
      )
  }

  setToken(token : string){
    localStorage.setItem("token", token)
  }
}
