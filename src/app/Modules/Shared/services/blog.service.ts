import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  API_Connection!: string;

  private readonly _url = 'https://devjourney21.onrender.com/story';

  constructor(private _HttpClient: HttpClient) {}

  getURL() {
    return this.API_Connection;
  }

  UpdateBlog(blogData: any, id: string) {
    return this._HttpClient.patch(`${[this._url]}/${id}`, blogData);
  }

  getBlogById(id: string) {
    console.log(id);

    return this._HttpClient.get(`${this._url}/${id}`);
  }

  addBlog(blogData: any): Observable<any> {
    console.log(blogData);

    return this._HttpClient.post(`${[this._url]}/create`, blogData);
  }
}
