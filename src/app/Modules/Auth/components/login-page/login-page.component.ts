declare var google: any;
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { GoToService } from '../../../Shared/services/go-to.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MessagesModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  formControlsNames;
  subscribeRef!: Subscription;

  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _Router: Router,
    private _messageService: MessageService,
    public _GoToService: GoToService,
  ) {
    console.log('LOGIN_PAGE | ', 'constructor');
    this.formControlsNames = this._AuthService.formControlsNames;
  }


  ngOnInit(): void {
    console.log('LOGIN_PAGE | ', 'ngOnInit');

    // * create login form using [form builder service] - contains email & password
    this.loginForm = this._FormBuilder.group({
      //#region 
      [this.formControlsNames.email]: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]],
      [this.formControlsNames.password]: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}')]],
      //#endregion
    });
  }

  ngOnDestroy(): void {
    console.log('LOGIN_PAGE | ', 'ngOnDestroy');

    // * unsubscribe any observer subscription
    this.subscribeRef?.unsubscribe();

  }

  onLogin() {
    console.log('LOGIN_PAGE | ', 'onLogin', 'loginData:', this.loginForm.value);
    console.log('LOGIN_PAGE | ', 'form validation:', this.loginForm.valid);

    // * check validation
    if (this.loginForm.valid) {
      //#region
      this.subscribeRef =
        this._AuthService.setLogin(this.loginForm.value)
          .subscribe({
            next: (res) => {
              console.log('LOGIN_PAGE | ', 'subscribe next res', res);
              // * save user token using AUTH_SERVICE
              this._AuthService.setToken(res.token);
            },
            error: (err: HttpErrorResponse) => {
              console.log('LOGIN_PAGE | ', 'subscribe error', { err }, 'ErrorResponseMessage:', err.error);
            },
            complete: () => {
              // * navigate the user
              console.log('LOGIN_PAGE | ', 'subscribe complete', 'navigate user');
              this._Router.navigateByUrl(this._GoToService.page.DashAdminHome);
            }
          })
      //#endregion
    }
    else {
      this._messageService.add({ severity: 'error ', summary: 'Error', detail: "You need to enter your Data For login " });
    }
  }


}
