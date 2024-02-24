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

import { SocialLoginModule, SocialAuthServiceConfig, SocialAuthService } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MessagesModule,
    ToastModule,
    SocialLoginModule
  ],
  providers: [
    MessageService,

  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  formControlsNames;
  msgError?: string;
  isLoading: boolean;
  loginSubscribe!: Subscription;

  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _Router: Router,
    private _messageService: MessageService,
    public _GoToService: GoToService,
    private _SocialAuthService: SocialAuthService
  ) {
    this.formControlsNames = this._AuthService.formControlsNames;
    this.isLoading = false;
  }

  private _decodeToken(token: string) {
    const [, payloadBase64] = token.split('.');
    const decodedPayload = atob(payloadBase64);
    return JSON.parse(decodedPayload);
  }
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '1053535178998-hue748m16ththudl9mm7jpcatbtro3vi.apps.googleusercontent.com',
      callback: (res: any) => {
        if (res) {
          const payLoad = this._decodeToken(res.credential);
          console.log('res', payLoad);

        }



      }
    });

    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 350,
      locale: 'en-US'
    });
    console.log(google);


    this.loginForm = this._FormBuilder.group({
      //#region 
      [this.formControlsNames.email]: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]],
      [this.formControlsNames.password]: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}')]],
      rememberMe: [false]
      //#endregion
    });
  }

  ngOnDestroy(): void {
    this.loginSubscribe?.unsubscribe();
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.valid);
      //#region valid
      this.isLoading = true;
      this.loginSubscribe = this._AuthService.setLogin({
        "email": "ahmedemutti@gmail.com",
        "password": "Ahmed@123",
      })
        .subscribe({
          next: (res) => {
            console.log(res);
            this.isLoading = false;
            if (res.message == 'success') {
              if (this.loginForm.value.rememberMe) this._AuthService.setToken(res.token);
              console.log(this._AuthService.getToken());
              this._Router.navigate([this._GoToService.page.DashAdminHome]);
            }
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            this.isLoading = false;
            this.msgError = err.error.message;
            this._messageService.add({ severity: 'error ', summary: 'Error', detail: this.msgError });
          },
        })
      //#endregion
    }
  }

  // * Social Login
  signInWithFB(): void {
    this._SocialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this._SocialAuthService.signOut();
  }
}
