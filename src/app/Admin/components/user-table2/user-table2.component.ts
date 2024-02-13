import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TagModule } from 'primeng/tag';
import {
  faEllipsisV,
  faMagnifyingGlass,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { TableModule } from 'primeng/table';
// import { TreeTableModule } from 'primeng/treetable';

@Component({
  selector: 'app-user-table2',
  standalone: true,
  imports: [TagModule, FontAwesomeModule, TableModule],
  templateUrl: './user-table2.component.html',
  styleUrl: './user-table2.component.css',
})
export class UserTable2Component {
  faEllipsisV = faEllipsisV;
  faMagnifyingGlass = faMagnifyingGlass;
  faFilter = faFilter;

  users: any = [
    {
      id: '1000',
      name: 'smith Row',
      detail: 'back-End Developer',
      image: 'bamboo-watch.jpg',
      email: 'smoth@gmail.com',
      role: 'Admin',
      state: 'Active',
    },
    {
      id: '1000',
      name: ' Row smith',
      detail: 'Front-End Developer',
      image: 'bamboo-watch.jpg',
      email: 'smoth@gmail.com',
      role: 'User',
      state: 'Deactivate',
    },
  ];

  getSeverity(role: string) {
    switch (role) {
      case 'User':
        return 'info';

      case 'Admin':
        return 'success';

      default:
        return '';
    }
  }
}
