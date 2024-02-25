import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  API_Connection!:string;

  constructor(private _HttpClient: HttpClient) { }

  getURL(){
    return this.API_Connection;
  }


  UpdateBlog()
  {
    return "Updated";
  }


  getBlogById()
  {
    return "My blog"
  }


  addBlog()
  {
    return "AddBlog"
  }
}
