import { Component } from '@angular/core';
import { LoginPageComponent } from '../../Auth/components/login-page/login-page.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [
    RouterModule,
    LoginPageComponent,
  ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css'
})
export class AuthLayoutComponent {

}
