import { Injectable } from '@angular/core';
import { PagesNames } from '../../../app.routes';

@Injectable({
  providedIn: 'root',
})
export class GoToService {
  page: PagesNames;

  constructor() {
    this.page = {
      login: '/login',
      register: '/registration',
      DashAdminHome: '/dashboard/home',
      DashAdminUsers: '/dashboard/users',
      DashAdminBlogs: '/dashboard/blogs/',
      DashAdminBlogsDetails: '/dashboard/blogs/blogdetails/',
      DashAdminUserProfile: '/dashboard/users/',
      DashAdminEditUserProfile: '/dashboard/users/edit/',
      DashAdminEditBlog: '/dashboard/blogs/',
      DashAdminAddBlog: '/dashboard/blogs/add',
      errorPage: '/notfound',
      landingPage: '/',
    } as const;
  }
}
