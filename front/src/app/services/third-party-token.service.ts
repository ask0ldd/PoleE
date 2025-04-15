import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { IJobsAPIAccessTokenResponse } from '../interfaces/jobsAPI/responses/IJobsAPIAccessTokenResponse';
import { IJobsAPIErrorResponse } from '../interfaces/jobsAPI/responses/IJobsAPIErrorResponse';
import { isJobsAPIAccessTokenResponse } from '../types/type-guards';

@Injectable({
  providedIn: 'root'
})
export class ThirdPartyTokenService {

  constructor(private httpClient : HttpClient) { }

  /* 
    BehaviorSubject inherits from Subject, which itself implements both Observer and Observable interfaces. 
    However, exposing the BehaviorSubject directly would allow external code to call .next() and modify its state, 
    violating encapsulation principles. By using .asObservable(), you create a read-only Observable interface 
    that prevents unauthorized emissions while preserving reactivity.
  */
  // emit when token is populated
  private tokenSubject = new BehaviorSubject<string | null>(this.getToken())
  token$ = this.tokenSubject.asObservable();


  fetchAccessToken(): Observable<string | null> {
    const url = '/jobsauth/connexion/oauth2/access_token?realm=%2Fpartenaire';
    
    // Prepare the form data (application/x-www-form-urlencoded)
    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', import.meta.env.NG_APP_JOBSAPI_ID)
      .set('client_secret', import.meta.env.NG_APP_JOBSAPI_KEY)
      .set('scope', 'api_offresdemploiv2 o2dsoffre')

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.httpClient.post<IJobsAPIAccessTokenResponse | IJobsAPIErrorResponse>(url, body, { headers }).pipe(
      map(response => {
        if (/*"access_token" in response*/isJobsAPIAccessTokenResponse(response)) {
          this.setToken((response as IJobsAPIAccessTokenResponse).access_token)
          this.setExpirationDate(this.computeExpirationDate((response as IJobsAPIAccessTokenResponse).expires_in))
          return (response as IJobsAPIAccessTokenResponse).access_token
        } else {
          console.log(response.error_description)
          return null
        }
      }),
      catchError(() => of(null))
    )
  }

  setToken(token : string){
    // document.cookie = `token=${token}; HttpOnly; Secure; SameSite=Strict`
    localStorage.setItem("jobsToken", token)
    this.tokenSubject.next(token)
  }

  getToken() : string | null{
    /*const matches = document.cookie.match(/(?<=token=).+?(?=; HttpOnly)/g);
    return matches ? matches[0] : undefined*/
    return localStorage.getItem("jobsToken") ?? null
  }

  flushToken() : void{
    // document.cookie = ``
    localStorage.removeItem("jobsToken")
  }

  private computeExpirationDate(ValidityWindowInSeconds : number){
    return Date.now() + ValidityWindowInSeconds * 1000
  }

  getExpirationDate() : number | null{
    const expiration = localStorage.getItem("tokenExpiration")
    return expiration ? parseInt(expiration) : null
  }

  setExpirationDate(date : number){
    localStorage.setItem("tokenExpiration", date.toString())
  }
}
