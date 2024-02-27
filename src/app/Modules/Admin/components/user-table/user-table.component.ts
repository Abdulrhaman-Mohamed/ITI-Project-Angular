import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TagModule } from 'primeng/tag';
import {
  faEllipsisV,
  faMagnifyingGlass,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { PaginatorModule } from 'primeng/paginator';
import { FilterPipe } from './../../../Shared/pipes/filter.pipe';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgxPaginationModule } from 'ngx-pagination';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GoToService } from '../../../Shared/services/go-to.service';
import { UserService } from '../../services/user.service';
import { User } from '@angular/fire/auth';
import { AuthService } from '../../../Auth/services/auth.service';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    TagModule,
    FontAwesomeModule,
    PaginatorModule,
    FilterPipe,
    ToastModule,
    ConfirmDialogModule,
    NgxPaginationModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
  ],
  providers: [MessageService, ConfirmationService, UserService],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
})
export class UserTableComponent implements OnInit {
  searchAny: any;

  // pagination

  p: number = 1;
  itemsPerPage: number = 10;
  totalProducts: any;

  // fontawesome

  faEllipsisV = faEllipsisV;
  faMagnifyingGlass = faMagnifyingGlass;
  faFilter = faFilter;

  //data arrays
  filteredUsers: User[] = [];
  users: User[] = [];
  loggedUser!: any;

  constructor(
    public _AuthService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private service: UserService,
    public _GoToService: GoToService
  ) {}

  ngOnInit(): void {
    this.getUsers();

    this.loggedUser = this._AuthService.loggedUser;
    console.log(this.loggedUser.firstname);
  }

  getUsers() {
    this.service.getAllUsers().subscribe({
      next: (data) => {
        this.users = data.findAll;
        this.filteredUsers = this.users;
        console.log('users', this.users);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getSeverity(role: string) {
    switch (role) {
      case 'user':
        return 'info';
      case 'admin':
        return 'success';

      default:
        return '';
    }
  }

  deleteUser(userID: string) {
    console.log({ userID });

    this.confirmationService.confirm({
      message: 'Do you want to delete this user?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.service.distroyUser(userID).subscribe((res: any) => {
          this.getUsers();
        });

        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Record deleted',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }

  onSelectCategory(event: any) {
    const category = event.target.innerText;
    console.log(category);

    if (category == 'all') {
      this.filteredUsers = this.users;
      console.log(this.filteredUsers);
    } else if (category) {
      this.filteredUsers = this.users.filter(
        (user: any) => user.role === category
      );
    }
  }
}
