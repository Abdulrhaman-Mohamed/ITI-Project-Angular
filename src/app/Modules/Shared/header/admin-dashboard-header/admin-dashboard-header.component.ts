import { Component } from '@angular/core';


@Component({
  selector: 'app-admin-dashboard-header',
  standalone: true,
  imports: [],
  templateUrl: './admin-dashboard-header.component.html',
  styleUrl: './admin-dashboard-header.component.css'
})
export class AdminDashboardHeaderComponent {
  bars(){
    const sidebar = document.getElementById("sidebar-bars");
    console.log(sidebar);
    sidebar?.classList.toggle("show");
    sidebar?.classList.toggle("transitsion");
  }
}
