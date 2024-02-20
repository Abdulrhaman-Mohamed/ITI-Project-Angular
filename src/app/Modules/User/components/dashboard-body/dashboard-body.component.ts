import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUsers,
  faNewspaper,
  faAngleDoubleDown,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-body',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './dashboard-body.component.html',
  styleUrl: './dashboard-body.component.css',
})
export class DashboardBodyComponent {
  faUsers = faUsers;
  faAngleDoubleDown = faAngleDoubleDown;
  faNewspaper = faNewspaper;
}
