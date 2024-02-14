import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent {
  bars(){
    const sidebar = document.getElementById("sidebar-bars");
    console.log(sidebar);
    sidebar?.classList.toggle("show");
    sidebar?.classList.toggle("transitsion");
  }
}
