import { User } from './../../../Shared/interfaces/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GoToService } from '../../../Shared/services/go-to.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  // * Variables
  user!: User;

  private _userId!: string;
  imagePrefix: String = '';

  constructor(
    private _UserService: UserService,
    private _myActivatedRoute: ActivatedRoute,
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
  }
}
