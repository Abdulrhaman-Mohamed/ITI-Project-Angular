import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from '../../Auth/components/login-page/login-page.component';
import { FooterComponent } from '../../Shared/Components/footer/footer.component';
import { GoToService } from '../../Shared/services/go-to.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterModule,
    FooterComponent,
  ],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  constructor(public _GoToService: GoToService) { }
}
