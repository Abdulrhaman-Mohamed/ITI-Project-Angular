import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    //#region dependency injection
    private _HttpClient: HttpClient //#endregion
  ) {}

  private readonly _apiBaseUrl: string = 'https://devjourney21.onrender.com';
  private readonly _base_API: string = 'https://devjourney21.onrender.com';

  // * handle [USERS] requests [getAll - getOne - update - delete]
  //#region
  private readonly _UserEndpoints = {
    getAll: `${this._apiBaseUrl}/user/getall`,
    getOneById: `${this._apiBaseUrl}/user/`,
    upadteOneById: `${this._apiBaseUrl}/user/`, // ! using PATCH method
    deleteOneById: `${this._apiBaseUrl}/user/`,
  } as const;

  getAllUsers(): Observable<any> {
    return this._HttpClient.get(this._UserEndpoints.getAll);
  }
  getUserById(id: string): Observable<any> {
    return this._HttpClient.get(this._UserEndpoints.getOneById + id);
  }
  distroyUser(id: string): Observable<any> {
    return this._HttpClient.delete(this._UserEndpoints.deleteOneById + id);
  }
  updateUser(id: string, data: any): Observable<any> {
    return this._HttpClient.patch(this._UserEndpoints.upadteOneById + id, data);
  }
  //#endregion

  // * handle [BLOGS] requests [create - getAll - getOne - update - delete]
  //#region
  private readonly _BlogEndpoints = {
    create: `${this._apiBaseUrl}/story/create`,
    getAll: `${this._apiBaseUrl}/story/getall`,
    getOneById: `${this._apiBaseUrl}/story/`,
    upadteOneById: `${this._apiBaseUrl}/story/`, // ! using PATCH method
    deleteOneById: `${this._apiBaseUrl}/story/`,
  } as const;

  getAllPosts(): Observable<any> {
    return this._HttpClient.get(this._BlogEndpoints.getAll);
  }
  distroyPost(id: string): Observable<any> {
    return this._HttpClient.delete(this._BlogEndpoints.deleteOneById + id);
  }
  getPostById(id: string): Observable<any> {
    return this._HttpClient.get(this._BlogEndpoints.getOneById + id);
  }

  //#endregion

  // categories
  getCategories(): Observable<any> {
    return this._HttpClient.get(`${this._base_API}/categories`);
  }

  getPostsCategory(categoryId: string): Observable<any> {
    return this._HttpClient.get(`${this._base_API}/categoryID=${categoryId}`);
  }
}
