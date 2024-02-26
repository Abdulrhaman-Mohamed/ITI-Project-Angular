import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './../../Auth/services/auth.service';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { GoToService } from '../../Shared/services/go-to.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  // * inject services
  //#region 
  const _AuthService = inject(AuthService);
  const _Router = inject(Router);
  const _GoToService = inject(GoToService);
  //#endregion

  // * get token from local storage
  const token = _AuthService.getToken();

  console.log('TOKEN_INTERCEPTOR | ', 'get token form AUTH_SERVICE:', { token });
  // * check token
  if (token) {
    try {
      let decodedToken = jwtDecode(token);
      console.log('TOKEN_INTERCEPTOR | ', 'token data:', decodedToken, 'exp:', decodedToken.exp);

      const isExpiredToken = decodedToken && decodedToken.exp ? decodedToken.exp < Date.now() / 1000 : false;
      console.log('TOKEN_INTERCEPTOR | ', { isExpiredToken }, 'now:', Date.now());

      if (isExpiredToken) {
        _AuthService.clearToken();
        _Router.navigateByUrl(_GoToService.page.login);
        console.log('TOKEN_INTERCEPTOR | ', 'token expired, Go to login again');
      }
      else {
        console.log('TOKEN_INTERCEPTOR | ', 'token not expired');
        req = req.clone({
          setHeaders: { authorization: `Bearer ${token}` }
        });
        console.log('TOKEN_INTERCEPTOR | ', 'header keys', req.headers.keys());
        console.log('TOKEN_INTERCEPTOR | ', 'header after injecting token', { Authorization: req.headers.get('Authorization') });
      }
    } catch (error) {
      console.log('TOKEN_INTERCEPTOR | ', { error }, 'invalid token, Go to login again');
      _AuthService.clearToken();
      _Router.navigateByUrl(_GoToService.page.login);
    }
  }
  return next(req);
};
