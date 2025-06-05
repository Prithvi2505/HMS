import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { authState } from '../Model/auth-model';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  
  const store = inject<Store<{auth : authState}>>(Store);
  const router = inject(Router);

  return store.select('auth').pipe(
    map(auth => {
        if(auth.isAuthenticated){
          return true
        }
        else{
          router.navigate(['/login'])
          return false
        }
    })
  )
};
