import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _HttpClient: HttpClient) {}

  private _base_API: string = 'https://devjourney21.onrender.com/';
  private readonly _headers: any = {
    // ! angular interceptor
    accept: 'application/json',
    // Authorization: "Bearer aadssadsfsa",
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWRhMDgwY2RhNDM2NWM2MzE5MTUwNWEiLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImdvbWFhQGdvbWFhLmVzbGFtIiwiZmlyc3RuYW1lIjoiQWJkbyIsImxhc3RuYW1lIjoiR29tYWEiLCJpYXQiOjE3MDg4NjA1ODZ9.xl1gF2EoYRl4OsiPRn3itKFETBZcLu7cgvRWSXpKLqE',
  };

  // users
  getAllUsers(): Observable<any> {
    return this._HttpClient.get(`${this._base_API}user/getall`);
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

  distroyPost(id: number): Observable<any> {
    return this._HttpClient.delete(`${this._base_API}story/${id}`);
    // /story/id
  }

  // categories
  getCategories(): Observable<any> {
    return this._HttpClient.get(`${this._base_API}/categories`);
  }

  getPostsCategory(categoryId: Number): Observable<any> {
    return this._HttpClient.get(`${this._base_API}/categoryID=${categoryId}`);
  }
}
