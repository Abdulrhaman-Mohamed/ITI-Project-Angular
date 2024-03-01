import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GoToService } from '../../Shared/services/go-to.service';
import { User } from '../../Shared/interfaces/user';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedUser!: any;
  constructor(
    //#region dependency injection
    private _HttpClient: HttpClient,
    private _Router: Router,
    private _GoToService: GoToService
    //#endregion
  ) { }

  readonly formControlsNames = {
    //#region 
    _id: '_id',
    firstname: 'firstname',
    lastname: 'lastname',
    occupation: 'occupation',
    location: 'location',
    bio: 'bio',
    username: 'username',
    email: 'email',
    phone: 'phone',
    age: 'age',
    password: 'password'
    //#endregion
  } as const;

  // * ----------------- handle authentication requets [ sign up - login - logout ]
  //#region 
  private readonly _apiBaseUrl = 'https://devjourney21.onrender.com';
  private readonly _AuthEndpoints = {
    signup: `${this._apiBaseUrl}/DevJourney/signup`,
    login: `${this._apiBaseUrl}/DevJourney/login`,
  } as const;

  setRegister(userData: object): Observable<any> {

    return this._HttpClient.post(this._AuthEndpoints.signup, userData)
  }
  setLogin(userData: object): Observable<any> { return this._HttpClient.post(this._AuthEndpoints.login, userData) }
  logout(): void {
    this.clearToken();
    this._Router.navigateByUrl(this._GoToService.page.login);
  }
  //#endregion

  // * ----------------- handle token [ set - get - clear ] via local storage
  //#region 
  private readonly _tokenKey: string = 'access_token';
  setToken(access_token: string): void { localStorage.setItem(this._tokenKey, access_token) }
  getToken(): string | null { return localStorage.getItem(this._tokenKey) }
  clearToken(): void { localStorage.removeItem(this._tokenKey) }
  getLoggedUser() {
    const token = this.getToken();
    if (token) {
      // ! Schema
      let decodedToken = jwtDecode(token);
      this.loggedUser = decodedToken;
      console.log('AUTH_SERVICE | ', 'loggedUser: ', this.loggedUser);
      return this.loggedUser;
    }
  }
  //#endregion

}
