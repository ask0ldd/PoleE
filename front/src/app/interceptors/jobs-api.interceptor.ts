import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, filter, Observable, of, switchMap, take } from 'rxjs';
import { inject } from '@angular/core';
import { ThirdPartyTokenService } from '../services/third-party-token.service';

const TOKEN_REFRESH_THRESHOLD = 5000

export const jobsAPIInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next : HttpHandlerFn) : Observable<HttpEvent<unknown>> => {

  const thirdPartyTokenService = inject(ThirdPartyTokenService)

  // Skip interception for non-JobsAPI requests
  if (!req.url.includes("/jobsapi/")) {
    return next(req);
  }

  const storageToken = thirdPartyTokenService.getToken()
  const expirationDate = thirdPartyTokenService.getExpirationDate()
  
  // don't refresh the token if it expires in more than 5 secs
  if(storageToken != null && expirationDate && (expirationDate - Date.now() > TOKEN_REFRESH_THRESHOLD)) {
    const requestToForward = req.clone({
      setHeaders: { Authorization: `Bearer ${storageToken}` }
    })
    return next(requestToForward)
  }

  return thirdPartyTokenService.fetchAccessToken().pipe(
    filter(token => token != null),
    take(1),
    catchError(error => {
      console.error('Failed to fetch access token:', error)
      return of(null)
    }),
    switchMap(token => {
      const requestToForward = token 
        ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        : req
      return next(requestToForward)
    })
  );
}
