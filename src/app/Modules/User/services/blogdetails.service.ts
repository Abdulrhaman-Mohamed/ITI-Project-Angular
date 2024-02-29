import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogdetailsService {
  // https://devjourney21.onrender.com/story
  private readonly _url = 'https://devjourney21.onrender.com/story';

  constructor(private _HttpClient:HttpClient) { }

  getBlogById(id:string)
  {
    console.log(id);
    
    return this._HttpClient.get(`${this._url}/${id}`)
    // return this._HttpClient.get("https://devjourney21.onrender.com/story/65d65b0eda4365c631914f19")
  }



}
