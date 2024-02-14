import { Routes } from '@angular/router';
import { UserProfileComponent } from './Modules/Admin/components/user-profile/user-profile.component';
import { EditProfileComponent } from './Modules/Admin/components/edit-profile/edit-profile.component';
import { UsersComponent } from './Modules/Admin/components/users/users.component';

export const routes: Routes = [

    { path: 'users', component: UsersComponent, title: "Users" },
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: 'users/:id', component: UserProfileComponent, title: 'User profile' },
    { path: 'users/edit/:id', component: EditProfileComponent, title: 'Edit profile' },


];
