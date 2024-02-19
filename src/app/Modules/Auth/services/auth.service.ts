import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient) { }

  // !----------------- User Interface
  setRegister(userData: object): Observable<any> {
    const _url = 'https://ecommerce.routemisr.com/api/v1/auth/signup';

    return this._HttpClient.post(_url, userData)
  }
}
