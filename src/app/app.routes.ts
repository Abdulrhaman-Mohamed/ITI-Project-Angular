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
import { guestGuard } from './Modules/Core/guards/guest.guard';
import { BlankLayoutComponent } from './Modules/layouts/blank-layout/blank-layout.component';
import { DashboardLayoutComponent } from './Modules/layouts/dashboard-layout/dashboard-layout.component';
import { dashboardGuard } from './Modules/Core/guards/dashboard.guard';

export interface PagesNames {
  login: '/login';
  register: '/registration';
  DashAdminHome: '/dashboard/home';
  DashAdminUsers: '/dashboard/users';
  DashAdminBlogs: '/dashboard/blogs/';
  DashAdminUserProfile: '/dashboard/users/';
  DashAdminEditUserProfile: '/dashboard/users/edit/';
  DashAdminEditBlog: '/dashboard/blogs/';
  DashAdminAddBlog: '/dashboard/blogs/add';
  errorPage: '/notfound';
}

export const routes: Routes = [
  // * Main Layout
  { path: '', component: MainLayoutComponent, title: 'DivJourney' },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  // * Blank Layout
  {
    path: '', component: BlankLayoutComponent, canActivate: [guestGuard],
    children: [
      { path: 'login', component: LoginPageComponent, title: 'Login' },
      { path: 'registration', component: RegisterPageComponent, title: 'Registration' },
    ],
  },
  // * Dashboard Layout
  {
    path: 'dashboard', component: DashboardLayoutComponent, canActivate: [dashboardGuard],
    children: [
      { path: '', component: DashboardBodyComponent, title: 'Home' },
      { path: 'home', redirectTo: '', pathMatch: 'full' },
      { path: 'users', component: UserTable2Component, title: 'Users' },
      { path: 'users/:id', component: UserProfileComponent, title: 'User profile' },
      { path: 'users/edit/:id', component: EditUserProfileComponent, title: 'Edit profile' },
      { path: 'blogs', component: PostsTableComponent, title: 'Blogs' },
      { path: 'blogs/:id', component: EditAddBlogComponent, title: 'Edit Blog' },
      { path: 'blogs/add', component: EditAddBlogComponent, title: 'Add Blog' },
      { path: 'blogs/blogdetails/:id', component: BlogDetailsComponent, title: 'Blog Details' }
    ],
  },
  { path: 'user', component: BlogDetailsComponent, canActivate: [authGuard] },
  { path: 'userTEST', component: BlogCardComponent, canActivate: [authGuard] },
  { path: '**', component: NotFoundComponent, title: 'Not found' },
];
