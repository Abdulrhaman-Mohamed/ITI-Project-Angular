import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-admin-dash-home',
  standalone: true,
  imports: [],
  templateUrl: './admin-dash-home.component.html',
  styleUrl: './admin-dash-home.component.css'
})
export class AdminDashHomeComponent implements OnInit {

  usersCount!: number;

  constructor(private _UserService: UserService) { }
  ngOnInit(): void {
    this._UserService.getUsers()
      .subscribe({
        // next: (res) => this.usersCount = res.length,
        next: (res) => console.log(res)
        ,
        error: (err) => console.log(err)

      })
  }



}
