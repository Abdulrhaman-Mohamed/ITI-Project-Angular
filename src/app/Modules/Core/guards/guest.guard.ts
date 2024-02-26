import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GoToService } from '../../Shared/services/go-to.service';
import { AuthService } from '../../Auth/services/auth.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const _GoToService = inject(GoToService);
  const _AuthService = inject(AuthService);

  if (!_AuthService.getToken()) {
    return true
  }
  else {
    _Router.navigateByUrl(_GoToService.page.DashAdminHome);
    return false;
  }
};
