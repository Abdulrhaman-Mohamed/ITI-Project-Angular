import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../Shared/Components/footer/footer.component';
import { GoToService } from '../../Shared/services/go-to.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterModule,
    FooterComponent,
    ReactiveFormsModule
  ],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  selectedFile: File | null = null;

  constructor(private http: HttpClient, public _GoToService: GoToService) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  onUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      console.log({ formData });

      this.http.post('http://localhost:3000/', formData)
        .subscribe(
          (response) => {
            console.log('File uploaded successfully', response);
          },
          (error) => {
            console.error('Error uploading file', error);
          }
        );
    } else {
      console.error('No file selected');
    }
  }
}