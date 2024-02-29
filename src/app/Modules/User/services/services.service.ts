import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private myClint: HttpClient) {}

  getAllPosts() {
    return this.myClint.get('http://localhost:3000/users');
  }

  getAllUsers(id: Number) {
    return this.myClint.get(`http://localhost:3000/posts/${id}`);
  }

  deleteUser() {
    return this.myClint.delete('http://localhost:3000/users/delete');
  }

  getCategories() {
    return this.myClint.get('http://localhost:3000/category');
  }

  getPostsCategory(categoryId: Number) {
    return this.myClint.get(`http://localhost:3000/categoryID=${categoryId}`);
  }
}
