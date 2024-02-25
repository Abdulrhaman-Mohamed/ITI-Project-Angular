import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TagModule } from 'primeng/tag';
import {
  faEllipsisV,
  faMagnifyingGlass,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { TableModule } from 'primeng/table';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './../../pipes/filter.pipe';
import {
  MenuItem,
  MessageService,
  ConfirmationService,
  ConfirmEventType,
} from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SpeedDialModule } from 'primeng/speeddial';
import { DropdownModule } from 'primeng/dropdown';
import { NgxPaginationModule } from 'ngx-pagination';

import { ServicesService } from '../../services/services.service';
import { RouterModule } from '@angular/router';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-user-table2',
  standalone: true,
  imports: [
    TagModule,
    FontAwesomeModule,
    TableModule,
    PaginatorModule,
    CommonModule,
    FilterPipe,
    ToastModule,
    MenuModule,
    ButtonModule,
    RouterModule,
    SpeedDialModule,
    ConfirmDialogModule,
    DropdownModule,
    NgxPaginationModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './user-table2.component.html',
  styleUrl: './user-table2.component.css',
})
export class UserTable2Component implements OnInit {
  searchAny: any;
  filteredUsers: any[] = [];
  first: number = 0;
  rows: number = 10;
  p: number = 1;
  itemsPerPage: number = 10;
  totalProducts: any;

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

  categories: any[] = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' },
  ];

  selectedCategoryId: any;

  // ----- get users data from API
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService // private service: ServicesService
  ) {}

  ngOnInit(): void {
    this.filteredUsers = this.users;
    //   this.getUsers()
    // getCategories()
  }

  // getUsers(){
  //   this.service.getAllUsers().subscribe({
  // next: (data) => {
  //     this.users = res
  //   }, error: (error){
  //     console.log(error);
  //   }})
  // }

  getCategories() {
    //   this.service.getCategories().subscribe({
    //     next: (data) => {
    //       this.category =  data
    //       this.totalProducts= data.length
    //     },
    //     error: (error) => {
    //       console.log(error);
    // }})
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0; //null coalescing
    this.rows = event.rows ?? 0;
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

  deleteUser(event: any, user: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this user?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        //  this.service.distroyUser(user.id).subscribe((res:any)=>{
        // this.users = this.users.filter(data=> data.id !== user.id)
        //   this.getUsers()
        //  })

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
    // if (categoryId) {
    //   this.selectedCategoryId = categoryId;
    //   this.service.getPostsCategory(categoryId).subscribe({
    //     next: (data) => {
    //         this.users = res
    //       }, error: (error){
    //         console.log(error);
    //       }})
    // }
  }
}
