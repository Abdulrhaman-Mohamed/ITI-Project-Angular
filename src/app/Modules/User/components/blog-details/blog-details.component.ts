import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BlogdetailsService } from '../../services/blogdetails.service';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [],
  providers:[BlogdetailsService],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements OnInit {
  coverType:string="none";
  video=`<iframe src=${"URL"} frameborder="0" width="100%" height="400" >
  </iframe>`;
  constructor(
    private sanitizer:DomSanitizer,
    private blogDetailsService:BlogdetailsService
    ){}

  ngOnInit(): void {
    
  }
  sanitizeVideoUrl() {
    return this.sanitizer.bypassSecurityTrustHtml(this.video)
  }

}
