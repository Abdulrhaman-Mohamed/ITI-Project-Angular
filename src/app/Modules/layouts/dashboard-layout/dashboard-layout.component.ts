import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../Auth/services/auth.service';
import { GoToService } from '../../Shared/services/go-to.service';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'

})
export class DashboardLayoutComponent {
  constructor(
    private _AuthService: AuthService,
    public _GoToService: GoToService
  ) { }
  onLogout(): void { this._AuthService.logout() }
}
