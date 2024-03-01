import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../Auth/services/auth.service';
import { GoToService } from '../../Shared/services/go-to.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent implements OnInit {
  loggedUser!: any;

  activeLink: string = '';

  setActiveLink(link: string) {
    this.activeLink = link;
  }

  constructor(
    private _AuthService: AuthService,
    public _GoToService: GoToService
  ) {}
  ngOnInit(): void {
    this.loggedUser = this._AuthService.loggedUser;
    console.log(this.loggedUser);
  }

  onLogout(): void {
    this._AuthService.logout();
  }
}
