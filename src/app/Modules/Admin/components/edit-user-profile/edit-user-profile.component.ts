import { User } from './../../../Shared/interfaces/user';
import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputSwitchModule } from 'primeng/inputswitch';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule
    ,ButtonModule
    ,ToastModule,
    InputSwitchModule],
    providers: [MessageService],
  templateUrl: './edit-user-profile.component.html',
  styleUrl: './edit-user-profile.component.css',
})
export class EditUserProfileComponent implements OnDestroy {
  getUser$: any;
  constructor(
    private _UserService: UserService,
    private _myActivatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private messageService: MessageService,
    private router:Router
  ) {
    this.initializeForm();
  }


  // * Variables
  private _user!: User;
  private _userId!: string;
  imagePrefix: String = '';
  userForm!: FormGroup;
  imageUser!:string;
  
  ngOnInit(): void {
    console.log('init');
    this._userId = this._myActivatedRoute.snapshot.params['id'];
    console.log(this._userId);

    const subscription = this._UserService.getUserById(this._userId).subscribe((user) => {
      // * You can initialize the user object if you have existing data
      this._user = user.findById;
      this.imageUser = user.findById.userimage
      // Initialize form with user data
      this.initializeForm();

      console.log(this._user);
    });

    this.getUser$ = subscription;
  }

  FormControlsNames = {
    //#region
    firstname: 'firstname',
    lastname: 'lastname',
    email: 'email',
    password: 'password',
    newPassword: 'newpassword',
    occupation: 'occupation',
    location: 'location',
    bio: 'bio',
    username: 'username',
    phone: 'phone',
    age: 'age',
    isActive:'isActive'
    //#endregion
  } as const;

  initializeForm() {
    // Initialize form with user data
    this.userForm = this._formBuilder.group({
      [this.FormControlsNames.isActive]: [
        this._user?.isActive,
        // Validators.minLength(3),
      ],
      [this.FormControlsNames.firstname]: [
        this._user?.firstname,
        Validators.required,
        // Validators.minLength(3),
      ],
      [this.FormControlsNames.lastname]: [
        this._user?.lastname,
        Validators.required,
        // Validators.minLength(3),
      ],
      [this.FormControlsNames.occupation]: [this._user?.occupation, Validators.required],
      [this.FormControlsNames.location]: [
        this._user?.location,
        Validators.required,
      ],
      [this.FormControlsNames.bio]: [this._user?.bio, Validators.required],
      [this.FormControlsNames.password]: [
        this._user?.password,
        Validators.required,
      ],
      [this.FormControlsNames.username]: [
        this._user?.username,
        Validators.required,
      ],
      [this.FormControlsNames.email]: [
        this._user?.email,
        [Validators.required, Validators.email],
      ],
      [this.FormControlsNames.phone]: [this._user?.phone, Validators.required],
      [this.FormControlsNames.age]: [this._user?.age, Validators.required],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      // Retrieve form values
      const formData = this.userForm.value;
      // You can perform any additional processing here
      console.log(formData);
      //Api request
      
      this._UserService.updateUser(this._userId,formData).subscribe({
        complete:()=>{
          // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Check all inputs are required' });
          this.router.navigate(["/dashboard/users/"])

        }
      })
      
    } else {
      // Handle form validation errors
      console.log(this.userForm);
      
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Check all inputs are required' });
    }
  }

  goToUsers()
  {
    this.router.navigate(["/dashboard/users/"])
  }

  ngOnDestroy(): void {
    this.getUser$.unsubscribe();
  }
}
