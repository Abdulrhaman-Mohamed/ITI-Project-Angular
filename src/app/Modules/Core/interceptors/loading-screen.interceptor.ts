import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxLoadingService } from 'ngx-loading';
import { NgxSpinnerService } from 'ngx-spinner';
export const loadingScreenInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingScreen = inject(NgxSpinnerService);
  loadingScreen.show();
  return next(req);
};
