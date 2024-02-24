import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _HttpClient: HttpClient) { }

  private _base_API: string = "https://devjourney21.onrender.com/";
  // private _base_API: string = "http://localhost:3000/api/";
  private readonly _headers: any = { // ! angular interceptor
    accept: "application/json",
    // Authorization: "Bearer aadssadsfsa",
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ3NGVlMmRhNDM2NWM2MzE5MTRmNmEiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6IkFobWVkQHlhaG9vLmNvbSIsImZpcnN0bmFtZSI6IkFobWVkIiwibGFzdG5hbWUiOiJNb2hhbWVkIiwiaWF0IjoxNzA4NjA5MjgwfQ.SKIJ5cK93IHYpK4Su8xcGilDZQTuF0hqhzcaBC8Yq00'

  }

  // _HttpClient = inject(HttpClient);

  getUsers(): Observable<any> {
    return this._HttpClient.get("https://devjourney21.onrender.com/story/getall", {
      headers: this._headers
    });
  }

  getUserById(id: number): Observable<any> {
    return this._HttpClient.get(this._base_API + 'users/' + id);
  }

  // Abdalrahman Gomaa additon

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
