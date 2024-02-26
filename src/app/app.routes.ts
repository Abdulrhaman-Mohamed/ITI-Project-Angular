import { Routes } from '@angular/router';
import { MainLayoutComponent } from './Modules/layouts/main-layout/main-layout.component';
import { AdminDashLayoutComponent } from './Modules/layouts/admin-dash-layout/admin-dash-layout.component';
import { LoginPageComponent } from './Modules/Auth/components/login-page/login-page.component';
import { RegisterPageComponent } from './Modules/Auth/components/register-page/register-page.component';
import { NotFoundComponent } from './Modules/Shared/Components/not-found/not-found.component';
import { EditUserProfileComponent } from './Modules/Admin/components/edit-user-profile/edit-user-profile.component';
import { AuthLayoutComponent } from './Modules/layouts/auth-layout/auth-layout.component';
import { AdminDashMainLayoutComponent } from './Modules/layouts/admin-dash-main-layout/admin-dash-main-layout.component';
import { EditAddBlogComponent } from './Modules/Shared/Components/edit-add-blog/edit-add-blog.component';
import { UserProfileComponent } from './Modules/Admin/components/user-profile/user-profile.component';
import { BlogDetailsComponent } from './Modules/User/components/blog-details/blog-details.component';
import { authGuard } from './Modules/Core/guards/auth.guard';
import { BlogCardComponent } from './Modules/User/components/blog-card/blog-card.component';
import { DashboardBodyComponent } from './Modules/Admin/components/dashboard-body/dashboard-body.component';
import { UserTable2Component } from './Modules/Admin/components/user-table2/user-table2.component';
import { PostsTableComponent } from './Modules/Admin/components/posts-table/posts-table.component';

export interface PagesNames {
  login: '/login';
  register: '/registration';
  DashAdminHome: '/dashboard/home';
  DashAdminUsers: '/dashboard/users';
  DashAdminBlogs: '/dashboard/blogs/';
  DashAdminBlogsDetails:'/dashboard/blogs/blogdetails/';
  DashAdminUserProfile: '/dashboard/users/';
  DashAdminEditUserProfile: '/dashboard/users/edit/';
  DashAdminEditBlog: '/dashboard/blogs/';
  DashAdminAddBlog: '/dashboard/blogs/add';
}

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginPageComponent, title: 'Login' },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'registration',
        component: RegisterPageComponent,
        title: 'Registration',
      },
    ],
  },
  {
    path: 'dashboard',
    component: AdminDashMainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: AdminDashLayoutComponent,
        children: [
          { path: 'home', component: DashboardBodyComponent, title: 'Home' },
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'users', component: UserTable2Component, title: 'Users' },
          {
            path: 'users/:id',
            component: UserProfileComponent,
            title: 'User profile',
          },
          {
            path: 'users/edit/:id',
            component: EditUserProfileComponent,
            title: 'Edit profile',
          },
          { path: 'blogs', component: PostsTableComponent, title: 'Blogs' },
          { path: 'blogs/:id', component: EditAddBlogComponent, title: 'Blog' },
          { path: 'blogs/add', component: EditAddBlogComponent, title: 'Blog' },
          {
            path: 'blogs/blogdetails/:id',
            component: BlogDetailsComponent,
            title: 'aaa',
          },
        ],
      },
    ],
  },
  { path: 'user', component: BlogDetailsComponent },
  { path: 'userTEST', component: BlogCardComponent },
  { path: '**', component: NotFoundComponent, title: 'Not found' },
];
