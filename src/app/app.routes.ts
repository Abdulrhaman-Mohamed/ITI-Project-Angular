import { Routes } from '@angular/router';
import { MainLayoutComponent } from './Modules/layouts/main-layout/main-layout.component';
import { AdminDashLayoutComponent } from './Modules/layouts/admin-dash-layout/admin-dash-layout.component';
import { LoginPageComponent } from './Modules/Auth/components/login-page/login-page.component';
import { RegisterPageComponent } from './Modules/Auth/components/register-page/register-page.component';
import { AdminDashHomeComponent } from './Modules/Admin/components/admin-dash-home/admin-dash-home.component';
import { UsersComponent } from './Modules/Admin/components/users/users.component';
import { BlogsComponent } from './Modules/Admin/components/blogs/blogs.component';
import { NotFoundComponent } from './Modules/Shared/Components/not-found/not-found.component';
import { EditUserProfileComponent } from './Modules/Admin/components/edit-user-profile/edit-user-profile.component';
import { AuthLayoutComponent } from './Modules/layouts/auth-layout/auth-layout.component';
import { AdminDashMainLayoutComponent } from './Modules/layouts/admin-dash-main-layout/admin-dash-main-layout.component';
import { EditAddBlogComponent } from './Modules/Shared/Components/edit-add-blog/edit-add-blog.component';
import { UserProfileComponent } from './Modules/Admin/components/user-profile/user-profile.component';
import { BlogDetailsComponent } from './Modules/User/components/blog-details/blog-details.component';
<<<<<<< HEAD

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
        children: [
            {
                path: '',
                component: AdminDashLayoutComponent,
=======
import { authGuard } from './Modules/Core/auth.guard';
import { BlogCardComponent } from './Modules/User/components/blog-card/blog-card.component';

export interface PagesNames {
    login: '/login',
    register: '/registration',
    DashAdminHome: '/dashboard/home',
    DashAdminUsers: '/dashboard/users',
    DashAdminBlogs: '/dashboard/blogs',
    DashAdminUserProfile: '/dashboard/users/',
    DashAdminEditUserProfile: '/dashboard/users/edit/',
    DashAdminEditBlog: '/dashboard/blogs/',
    DashAdminAddBlog: '/dashboard/blogs/add',
}

export const routes: Routes = [
    {
        path: '', component: AuthLayoutComponent,
        children: [
            { path: 'login', component: LoginPageComponent, title: 'Login' },
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'registration', component: RegisterPageComponent, title: 'Registration' },
        ],
    },
    {
        path: 'dashboard', component: AdminDashMainLayoutComponent, canActivate: [authGuard],
        children: [
            {
                path: '', component: AdminDashLayoutComponent,
>>>>>>> AliAhmedM48
                children: [
                    { path: 'home', component: AdminDashHomeComponent, title: 'Home' },
                    { path: '', redirectTo: 'home', pathMatch: 'full' },
                    { path: 'users', component: UsersComponent, title: 'Users' },
<<<<<<< HEAD
                    {
                        path: 'blogs',
                        component: BlogsComponent,
                        title: 'Blogs',
                    },
                    {
                        path: 'users/:id',
                        component: UserProfileComponent,
                        title: 'User profile',
                    },
                    {
                        path: 'users/:id/edit',
                        component: EditUserProfileComponent,
                        title: 'Edit profile',
                    },
=======
                    { path: 'blogs', component: BlogsComponent, title: 'Blogs' },
                    { path: 'users/:id', component: UserProfileComponent, title: 'User profile' },
                    { path: 'users/edit/:id', component: EditUserProfileComponent, title: 'Edit profile' },
>>>>>>> AliAhmedM48
                ],
            },
            { path: 'blogs/:id', component: EditAddBlogComponent, title: 'Blog' },
            { path: 'blogs/add', component: EditAddBlogComponent, title: 'Blog' },
            {
                path:"blogs/blogdetails/:id" ,component: BlogDetailsComponent
            }
        ],
    },
    { path: 'user', component: BlogDetailsComponent },
<<<<<<< HEAD
=======
    { path: 'userTEST', component: BlogCardComponent },
>>>>>>> AliAhmedM48
    { path: '**', component: NotFoundComponent, title: 'Not found' },
];
