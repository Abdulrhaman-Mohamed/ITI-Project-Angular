import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShortTextPipe } from './../../../Shared/pipes/short-text.pipe';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { RouterModule } from '@angular/router';
import { GoToService } from '../../../Shared/services/go-to.service';
import { AuthService } from '../../../Auth/services/auth.service';
import { User } from '../../../Shared/interfaces/user';

import {
  faUsers,
  faNewspaper,
  faAngleDoubleDown,
  faAngleDoubleUp,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard-body',
  standalone: true,

  imports: [FontAwesomeModule, CommonModule, RouterModule, ShortTextPipe],
  providers: [UserService],

  templateUrl: './dashboard-body.component.html',
  styleUrl: './dashboard-body.component.css',
})
export class DashboardBodyComponent implements OnInit {
  faUsers = faUsers;
  AngleDoubleIconUser = faAngleDoubleDown;
  AngleDoubleIconPost = faAngleDoubleLeft;
  faNewspaper = faNewspaper;
  loggedUser!: any;
  posts: any = [];
  users: any = [];

  constructor(
    private service: UserService,
    public _AuthService: AuthService,
    public _GoToService: GoToService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getPosts();

    this.loggedUser = this._AuthService.loggedUser;
  }

  getUsers() {
    this.service.getAllUsers().subscribe({
      next: (data) => {
        this.users = data.findAll;
        console.log('users', data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getPosts() {
    this.service.getAllPosts().subscribe({
      next: (data) => {
        this.posts = data.findAll;
        console.log('stories', data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getUsersCount() {
    return this.users.length;
  }

  getPostsCount() {
    return this.posts.length;
  }

  changingOrderUser() {
    if (this.AngleDoubleIconUser === faAngleDoubleDown) {
      this.AngleDoubleIconUser = faAngleDoubleUp;
      this.users.sort(function (a: any, b: any) {
        let nameA = a.firstname.toUpperCase();
        let nameB = b.firstname.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
    } else {
      this.AngleDoubleIconUser = faAngleDoubleDown;
      this.users.sort(function (a: any, b: any) {
        let nameA = a.firstname.toUpperCase();
        let nameB = b.firstname.toUpperCase();

        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }

        // names must be equal
        return 0;
      });
    }
  }

  changingOrderPost() {
    if (this.AngleDoubleIconPost === faAngleDoubleLeft) {
      this.AngleDoubleIconPost = faAngleDoubleRight;
      this.posts.sort(function (a: any, b: any) {
        let titleA = a.title.toUpperCase();
        let titleB = b.title.toUpperCase();
        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }

        // titles must be equal
        return 0;
      });
    } else {
      this.AngleDoubleIconPost = faAngleDoubleLeft;
      this.posts.sort(function (a: any, b: any) {
        let titleA = a.title.toUpperCase();
        let titleB = b.title.toUpperCase();
        if (titleA < titleB) {
          return 1;
        }
        if (titleA > titleB) {
          return -1;
        }

        // titles must be equal
        return 0;
      });
    }
  }
}
