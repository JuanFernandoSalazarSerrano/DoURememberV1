import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
// inject the auth service in this way, because it is not a class its an arrow function:

  const AuthService  = inject(Auth);
  const router = inject(Router)


  if(AuthService.authenticated()){

    if (isTokenExpired()){

      AuthService.logout();
      router.navigate(['/login'])

      return false
    }

    return true;
  }

  router.navigate(['/login'])
  return false;

};


const isTokenExpired = () => {

  const AuthService  = inject(Auth);
  const token = AuthService.token
  const payload = AuthService.getpayload(token!);
  const exp = payload.exp;

  // compare date for expiration

  const nowInMiliSeconds = (new Date().getTime())/1000

  if (nowInMiliSeconds > exp){
    return true;
  }
  return false;

}
