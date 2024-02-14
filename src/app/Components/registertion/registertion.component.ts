import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-registertion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registertion.component.html',
  styleUrl: './registertion.component.css',
})
export class RegistertionComponent implements OnInit {
  myForm!: FormGroup;
  constructor(private _FormBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.creatForm();
  }
  creatForm() {
    this.myForm = this._FormBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
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
      this.myForm.controls['password'].dirty
    );
  }
  get PasswordValidRegex() {
    return this.myForm.controls['password'].errors?.['pattern'];
  }
  //#endregion Password
}
