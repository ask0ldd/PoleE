import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { inject } from '@angular/core';
import { ThirdPartyTokenService } from '../services/third-party-token.service';

export const jobsAPIInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next : HttpHandlerFn) : Observable<HttpEvent<unknown>> => {
  const thirdPartyTokenService = inject(ThirdPartyTokenService)

  let token : string | null

  /*function refreshToken(){
    thirdPartyTokenService.fetchAccessToken().pipe(take(1)).subscribe(tk => {
      token = tk
      if(tk) thirdPartyTokenService.setToken(tk)
    })
  }*/
  
  try{
    if (req.url.includes("/jobsapi/")) {
      token = thirdPartyTokenService.getToken()

      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })

      return next(clonedRequest)
    }

    return next(req)
  } catch(e) {
    if(e instanceof Error) console.error(e.message)
    return next(req)
  }
}
