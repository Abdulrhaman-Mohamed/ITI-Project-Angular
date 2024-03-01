import { User } from './../../../Shared/interfaces/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GoToService } from '../../../Shared/services/go-to.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterModule, TagModule, ConfirmDialogModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  // * Variables
  user!: User;
  filteredPosts: any[] = [];
  posts: any = [];
  categories: any = [
    { name: 'Historical' },
    { name: 'Technology' },
    { name: 'Education' },
    { name: 'Personal' },
    { name: 'General' },
  ];

  private _userId!: string;
  imagePrefix: String = '';

  constructor(
    private _UserService: UserService,
    private _myActivatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public _GoToService: GoToService
  ) {}

  ngOnInit(): void {
    this._userId = this._myActivatedRoute.snapshot.params['id'];
    console.log(this._userId);

    this._UserService.getUserById(this._userId).subscribe((user) => {
      this.user = user.findById;
      console.log({ user });

      console.log('constructor profile', this.user);
    });

    this.getPosts();
  }

  getPosts() {
    this._UserService.getAllPosts().subscribe({
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
        this._UserService.distroyPost(postId).subscribe({
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
}
