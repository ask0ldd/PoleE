import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService)
  const router = inject(Router)

  return authService.isLogged$.pipe(
    map(isLogged => {
      if (!isLogged) {
        router.navigate(['/login'])
        return false;
      }
      return true;
    })
  ) 
}
