import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './../../Auth/services/auth.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const _AuthService = inject(AuthService);

  if (_AuthService.getToken()) {
    const tokenObject: any = { token: _AuthService.getToken() }
    req = req.clone({ setHeaders: tokenObject, })
  }
  return next(req);
};
