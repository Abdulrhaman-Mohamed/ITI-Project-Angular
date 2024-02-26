import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { GoToService } from '../../services/go-to.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
  constructor(public _GoToService: GoToService) { }
}
