import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { SidebarModule  } from 'primeng/sidebar';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [SidebarModule,ButtonModule],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent {
  sidebarVisible: boolean = false;
  bars(){
    const sidebar = document.getElementById("sidebar-bars");
    console.log(sidebar);
    sidebar?.classList.toggle("show");
    sidebar?.classList.toggle("transitsion");
  }
}
