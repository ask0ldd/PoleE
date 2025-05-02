import { Injectable } from '@angular/core';
import IAuthLoginParams from '../interfaces/jobsAPI/requests/IAuthLoginParams';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import IAuthLoginResponse from '../interfaces/jobsAPI/responses/IAuthLoginResponse';
import IAuthRegisterParams from '../interfaces/jobsAPI/requests/IAuthRegisterParams';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _isLogged = new BehaviorSubject<boolean>(false)
  isLogged$ = this._isLogged.asObservable()
  _token = new BehaviorSubject<string | null>(null)
  token$ = this._token.asObservable()

  constructor(private http : HttpClient) { }

  loginUrl = "http://localhost:3000/auth/login"
  registerUrl = "http://localhost:3000/auth/register"
  headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    // .set('X-Requested-With', 'XMLHttpRequest')

  login({username, password} : IAuthLoginParams) : Observable<string | null> {

    // check length
    const body = new HttpParams()
      .set('username', username)
      .set('password', password)

    return this.http
      .post<IAuthLoginResponse>(this.loginUrl, body, {headers : this.headers})
      .pipe(
        tap(token => {
          this.setToken(token.access_token)
          this._isLogged.next(true)
          this._token.next(token.access_token)
        }),
        map(response => response.access_token),
        catchError(err => {
          this._isLogged.next(false);
          return throwError(() => new Error('Authentication failed'));
        })
      )
  }

  register({username, email, password} : IAuthRegisterParams){
    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('email', email)

    return this.http
      .post<IAuthLoginResponse>(this.registerUrl, body, {headers : this.headers})
      .pipe(
        tap(token => {
          this.setToken(token.access_token)
          this._isLogged.next(true)
          this._token.next(token.access_token)
        }),
        map(response => response.access_token),
        catchError(err => {
          this._isLogged.next(false);
          return throwError(() => new Error('Authentication failed'));
        })
      )
  }

  setToken(token : string){
    localStorage.setItem("token", token)
  }

  private checkTokenValidity(): boolean {
    // Verify JWT expiration from secure cookie
    return true /* validation logic */;
  }
}
