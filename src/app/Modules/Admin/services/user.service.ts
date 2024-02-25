import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _HttpClient: HttpClient) { }

  private _base_API: string = "https://devjourney21.onrender.com/";
  private readonly _headers: any = { // ! angular interceptor
    accept: "application/json",
    // Authorization: "Bearer aadssadsfsa",
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ1YTRkN2JlN2VmMjFjZDU1MmNlODEiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImVzbGFkbUAxMjM0YjEyZDE4OTlubmdnYnkxeW5tMSIsImZpcnN0bmFtZSI6ImVzbGFtZWVlZWVlZWVlZWVlZWVlMTIzIiwibGFzdG5hbWUiOiJlc2xhbTEyMjExIiwiaWF0IjoxNzA4ODAwMzM3fQ.hGmqFnxJ1BG-ltGx7HeySgUAud19VstdiIG6skeb1EQ'
  }

  getUserById(id: number): Observable<any> {
    return this._HttpClient.get(this._base_API + 'user/' + id, { headers: this._headers });
  }


  getAllUsers(): Observable<any> {
    return this._HttpClient.get(`${this._base_API}users`);
  }

  distroyUser(id: number): Observable<any> {
    return this._HttpClient.delete(`${this._base_API}/users/${id}`);
    //  /user/id
  }

  getAllPosts(): Observable<any> {
    return this._HttpClient.get(`${this._base_API}story/getall`);
    // /story
  }

  distroyPost(id: number): Observable<any> {
    return this._HttpClient.delete(`${this._base_API}/story/${id}`);
    // /story/id
  }

  getCategories(): Observable<any> {
    return this._HttpClient.get(`${this._base_API}/categories`);
  }

  getPostsCategory(categoryId: Number): Observable<any> {
    return this._HttpClient.get(`${this._base_API}/categoryID=${categoryId}`);
  }
}
