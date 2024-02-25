import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TagModule } from 'primeng/tag';
import {
  faEllipsisV,
  faMagnifyingGlass,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { FilterPipe } from './../../../Shared/pipes/filter.pipe';
import {
  MessageService,
  ConfirmationService,
  ConfirmEventType,
} from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { NgxPaginationModule } from 'ngx-pagination';

import { ServicesService } from '../../services/services.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-table2',
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
  ],
  providers: [MessageService, ConfirmationService, ServicesService],
  templateUrl: './user-table2.component.html',
  styleUrl: './user-table2.component.css',
})
export class UserTable2Component implements OnInit {
  searchAny: any;
  filteredUsers: any[] = [];

  p: number = 1;
  itemsPerPage: number = 10;
  totalProducts: any;

  faEllipsisV = faEllipsisV;
  faMagnifyingGlass = faMagnifyingGlass;
  faFilter = faFilter;

  users: any = [];

  categories: any = [];

  selectedCategoryId: any;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private service: ServicesService
  ) {}

  ngOnInit(): void {
    this.filteredUsers = this.users;
    this.getUsers();
    this.getCategories();
  }

  getUsers() {
    this.service.getAllUsers().subscribe({
      next: (data) => {
        console.log(data);
        this.users = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getCategories() {
    this.service.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

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

  deleteUser(userID: number) {
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
    const categoryId = event.target.value;
    if (categoryId) {
      this.selectedCategoryId = categoryId;
      this.service.getPostsCategory(categoryId).subscribe({
        next: (data) => {
          this.users = data;
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
