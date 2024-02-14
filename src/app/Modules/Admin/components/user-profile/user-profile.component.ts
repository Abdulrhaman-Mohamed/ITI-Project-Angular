import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  // * Variables
  user!: User;

  private _userId!: number;
  imagePrefix: String = '';

  constructor(
    private _UserService: UserService,
    private _myActivatedRoute: ActivatedRoute,
  ) {
    this._userId = this._myActivatedRoute.snapshot.params['id'];

  }

  ngOnInit(): void {

    console.log("init");
    this._userId = this._myActivatedRoute.snapshot.params['id'];

    this._UserService.getUserById(this._userId)
      .subscribe(
        user => {
          this.user = user;

          console.log("constructor profile", this.user);
        }
      )


  }
}
