import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],

  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {

  myForm!: FormGroup;
  constructor(private _FormBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.creatForm();
  }
  creatForm() {
    this.myForm = this._FormBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          ),
        ],
      ],
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
      // go to /dashboard
    }
  }
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
      this.myForm.controls['password'].dirty
    );
  }
  get PasswordValidRegex() {
    return this.myForm.controls['password'].errors?.['pattern'];
  }
  //#endregion Password

}
