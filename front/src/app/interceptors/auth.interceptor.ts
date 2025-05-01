import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, switchMap } from "rxjs";
import { AuthService } from "../services/auth.service";

const TOKEN_REFRESH_THRESHOLD = 5000

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next : HttpHandlerFn) : Observable<HttpEvent<unknown>> => {

    if (!req.url.includes("http://localhost:3000")) {
        return next(req);
    }

    const authService = inject(AuthService)

    return authService.token$.pipe(
        switchMap(token => {
            const requestToForward = token 
                ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
                : req
            return next(requestToForward)
        })
    )
}