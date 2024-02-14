import { Routes } from '@angular/router';
import { FooterComponent } from './Modules/Shared/footer/footer.component';
import { HeaderComponent } from './Modules/Shared/header/header.component';
import { AdminDashboardHeaderComponent } from './Modules/Shared/header/admin-dashboard-header/admin-dashboard-header.component';

export const routes: Routes = [
    {path:"footer",component:FooterComponent},
    {path:"",component:AdminDashboardHeaderComponent},
];
