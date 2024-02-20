import { User } from './../../../Shared/interfaces/user';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RouterModule } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    RouterModule,
    UserProfileComponent,
    CommonModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit, OnDestroy {

  users!: User[];
  private _observableUsers!: Observable<any>;
  constructor(private _UserService: UserService) { }

  ngOnInit(): void {
    // * get users list from user service
    this._UserService.getUsers()
      .subscribe(data => this.users = data.users)
  }
  ngOnDestroy(): void {
    // this._observableUsers.subscribe();
  }







}
