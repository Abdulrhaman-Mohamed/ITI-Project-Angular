import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TagModule } from 'primeng/tag';
import {
  faEllipsisV,
  faMagnifyingGlass,
  faFilter,
  faTrashCan,
  faPenToSquare,
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

@Component({
  selector: 'app-posts-table',
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
  providers: [MessageService, ConfirmationService],

  templateUrl: './posts-table.component.html',
  styleUrl: './posts-table.component.css',
})
export class PostsTableComponent implements OnInit {
  searchAny: any;

  // pagination

  p: number = 1;
  itemsPerPage: number = 10;
  totalProducts: any;

  // fontawesome
  faEllipsisV = faEllipsisV;
  faMagnifyingGlass = faMagnifyingGlass;
  faFilter = faFilter;
  faTrashCan = faTrashCan;
  faPenToSquare = faPenToSquare;

  //data arrays
  filteredPosts: any[] = [];
  posts: any = [];
  users: any = [];
  categories: any = [
    { name: 'Historical' },
    { name: 'Technology' },
    { name: 'Education' },
    { name: 'Personal' },
    { name: 'General' },
  ];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private service: UserService,
    public _GoToService: GoToService
  ) {}

  ngOnInit(): void {
    this.getPosts();
    this.getUsers();
    (window as any).userService2 = this.service;
  }

  getPosts() {
    this.service.getAllPosts().subscribe({
      next: (data) => {
        this.posts = data.findAll;
        this.filteredPosts = this.posts;
        // console.log('stories', this.posts);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getUsers() {
    this.service.getAllUsers().subscribe({
      next: (data) => {
        this.users = data.findAll;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // uncomment the next 2 methods when users is is in every story createdBy
  getUserName(userId: string) {
    let user = this.users.find((u: any) => u._id == userId);
    if (user) {
      return user.firstname;
    } else {
      return;
    }
  }
  getUserDetail(userId: string) {
    const user = this.users.find((u: any) => u._id == userId);

    if (user) {
      return user.role;
    } else {
      return;
    }
  }
  getUserImage(userId: string) {
    const user = this.users.find((u: any) => u._id == userId);
    if (user) {
      return user.userimage;
    } else {
      return;
    }
  }

  getSeverity(category: string) {
    switch (category) {
      case 'Historical':
        return 'warning';
        break;
      case 'Technology':
        return 'success';
        break;
      case 'Education':
        return 'info';
        break;
      case 'Personal':
        return 'danger';
        break;
      case 'General':
        return 'secondary';
        break;

      default:
        return '';
    }
  }

  deletePost(postId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this post?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.service.distroyPost(postId).subscribe({
          next: (res) => {
            console.log(res);
          },
          complete: () => {
            this.getPosts();
          },
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
    const categoryName = event.target.innerText;
    console.log(categoryName);

    if (categoryName) {
      this.filteredPosts = this.posts.filter((post: any) => {
        console.log(post.category);
        return post.category === categoryName;
      });
    } else {
      this.filteredPosts = this.posts;
    }
  }
}
