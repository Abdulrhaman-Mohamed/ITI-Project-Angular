import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
// ! ----------------

import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MessagesModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit, OnDestroy {

  myForm!: FormGroup;

  // ! ----------------
  msgError?: string;
  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _Router: Router,
    private _messageService: MessageService
  ) { }



  isLoading: boolean = false;

  FormControlsNames = {
    //#region 
    firstName: 'firstName',
    lastName: 'lastName',
    // email: 'email',
    // password: 'password'
    //#endregion
  } as const;




  ngOnInit(): void {
    this.myForm = this._FormBuilder.group({
      //#region 
      [this.FormControlsNames.firstName]: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),],],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'),],],
      //#endregion
    });
  }

  registerSubscribe!: Subscription;

  ngOnDestroy(): void {
    this.registerSubscribe?.unsubscribe()
  }

  onSubmit() {
    console.log(this.myForm.get(this.FormControlsNames.firstName));

    if (this.myForm.valid) {
      //#region valid
      this.isLoading = true;
      console.log(this.myForm.value);
      this.registerSubscribe = this._AuthService.setRegister(this.myForm.value)
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            console.log(response)
            if (response.message == 'success') {
              this._Router.navigate(['/login'])
            }
          },
          error: (error: HttpErrorResponse) => {
            this.isLoading = false;

            this.msgError = error.error.message;
            console.log(this.msgError)

            this._messageService.add({ severity: 'error ', summary: 'Success', detail: this.msgError });

          },
        })
      //#endregion
    }
    else {
      //#region invalid

      //#endregion
    }
  }

  //#region First Name
  get NameValid() {
    return (
      this.myForm.controls['firstName'].errors?.['required'] &&
      this.myForm.controls['firstName'].dirty
    );
  }



  get NameValidMin() {
    return this.myForm.controls['firstName'].errors?.['minlength'];
  }


  //#endregion First Name
  //#region Last Name
  get lastNameValid() {
    return (
      this.myForm.controls['lastName'].errors?.['required'] &&
      this.myForm.controls['lastName'].dirty
    );
  }


  get lastNameValidmin() {
    return this.myForm.controls['lastName'].errors?.['minlength'];
  }
  //#endregion Last Name
  //#region Email
  get EmailValid() {
    return (
      this.myForm.controls['email'].errors?.['required'] &&
      this.myForm.controls['email'].dirty
    );
  }
  get EmailValidEmail() {
    return this.myForm.controls['email'].errors?.['pattern'];
  }
  //#endregion Email
  //#region Password
  get PasswordValid() {
    return (
      this.myForm.controls['password'].errors?.['required'] &&
      this.myForm.controls['password'].touched
    );
  }
  get PasswordValidRegex() {
    return this.myForm.controls['password'].errors?.['pattern'];
  }
  //#endregion Password
}
