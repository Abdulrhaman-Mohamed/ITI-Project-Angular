import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GoToService } from '../../Shared/services/go-to.service';
import { AuthService } from '../../Auth/services/auth.service';
import { MessageService } from 'primeng/api';


export const dashboardGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const _GoToService = inject(GoToService);
  const _AuthService = inject(AuthService);
  console.log('DASHBOARD_GUARD | ', 'LoggedUser is :', _AuthService.getLoggedUser()?.role);


  // const toastMessage = localStorage.getItem('toastMessage');
  
  // if (toastMessage) {
    

  //   messageService.add({ severity: 'success', summary: 'Success', detail: toastMessage });
  //   localStorage.removeItem('toastMessage'); // Clear the message
  // }

  if (_AuthService.getLoggedUser()?.role === 'admin') {
    return true
  }
  else {
    _Router.navigateByUrl(_GoToService.page.errorPage);
    return false;
  }
};
