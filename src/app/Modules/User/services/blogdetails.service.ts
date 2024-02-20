import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogdetailsService {

  constructor(private HttpClient:HttpClient) { }

  getBlogById()
  {
    return "blog";
  }
}
