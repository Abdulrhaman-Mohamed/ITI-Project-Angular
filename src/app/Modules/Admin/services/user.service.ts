import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../Auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  constructor(private _HttpClient: HttpClient,private _AuthService:AuthService ) {}
  /* https://devjourney21.onrender.com/test new URL  */
  private _base_API: string = 'https://devjourney21.onrender.com/';
  private readonly _headers: any = {
    // ! angular interceptor
    accept: 'application/json',
    // Authorization: "Bearer aadssadsfsa",
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWRiYjczNzVjODg0MzMyZWQ3ODc0NGYiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFiZG9AdGVzdDcuY29tIiwiZmlyc3RuYW1lIjoiYWJkbyIsImxhc3RuYW1lIjoidGVtbyIsImlhdCI6MTcwODk3NzEzNn0.XSeuqCA5pvPYpGc2dQMnB_fLHIlcBTlukrTZgmnucxQ',
  };

  // users
  getAllUsers(): Observable<any> {
    return this._HttpClient.get(`${this._base_API}user/getall`,{
      headers:{Authorization:`Bearer ${this._AuthService.getToken()}`}
    });
  }

  getUserById(id: number): Observable<any> {
    return this._HttpClient.get(this._base_API + 'user/' + id, {
      headers: this._headers,
    });
  }

  distroyUser(id: number): Observable<any> {
    return this._HttpClient.delete(`${this._base_API}user/${id}`);
    //  /user/id
  }

  // posts
  getAllPosts(): Observable<any> {
    return this._HttpClient.get(`${this._base_API}story/getall`);
    // /story
  }

  distroyPost(id:string): Observable<any> {
    return this._HttpClient.delete(`${this._base_API}story/${id}`);
    // /story/id
  }

  // categories
  getCategories(): Observable<any> {
    return this._HttpClient.get(`${this._base_API}categories`);
  }

  getPostsCategory(categoryId: Number): Observable<any> {
    return this._HttpClient.get(`${this._base_API}/categoryID=${categoryId}`);
  }
}
