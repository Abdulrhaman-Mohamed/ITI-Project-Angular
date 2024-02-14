import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../interfaces/user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  constructor(
    private _UserService: UserService,
    private _myActivatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder
  ) {
    this.initializeForm();

  }

  // * Variables
  private _user!: User;
  private _userId!: number;
  imagePrefix: String = '';
  userForm!: FormGroup;


  ngOnInit(): void {
    console.log("init");
    this._userId = this._myActivatedRoute.snapshot.params['id'];

    this._UserService.getUserById(this._userId)
      .subscribe(
        user => {
          // * You can initialize the user object if you have existing data
          this._user = user;
          // Initialize form with user data
          this.initializeForm();

          console.log(this._user);
        }
      )
  }


  initializeForm() {
    // Initialize form with user data
    this.userForm = this._formBuilder.group({
      name: [this._user?.name, Validators.required],
      occupation: [this._user?.occupation, Validators.required],
      location: [this._user?.location, Validators.required],
      bio: [this._user?.bio],
      username: [this._user?.username, Validators.required],
      email: [this._user?.email, [Validators.required, Validators.email]],
      phone: [this._user?.phone, Validators.required],
      age: [this._user?.age, Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      // Retrieve form values
      const formData = this.userForm.value;
      // You can perform any additional processing here
      console.log(formData);
    } else {
      // Handle form validation errors
    }
  }
}
