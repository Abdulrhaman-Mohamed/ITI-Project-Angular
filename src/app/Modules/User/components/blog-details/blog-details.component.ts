import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BlogdetailsService } from '../../services/blogdetails.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../Admin/services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [],
  providers: [BlogdetailsService, DatePipe],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css',
})
export class BlogDetailsComponent implements OnInit {
  coverType: string = 'video';
  video!: string;

  constructor(
    private sanitizer: DomSanitizer,
    private service: UserService,
    private blogDetailsService: BlogdetailsService,
    private _myActivatedRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  bodyBlog!: string;
  titleBlog!: string;
  selectedCategory!: string;
  coverimageURL!: string;
  coverimage!: string;
  createdAt!: any;
  createdByImage!:any;
  username!:string;

  ngOnInit(): void {
    let param = this._myActivatedRoute.snapshot.params['id'];
    console.log('this is param 🐱‍🚀', param);

    this.service.getPostById(param).subscribe({
      next: (res: any) => {
        if (res) {
          console.log(res);

          // Type guard to ensure object
          console.log('this is the response ', res.findById);

          this.bodyBlog = res.findById.body;
          this.titleBlog = res.findById.title;
          this.selectedCategory = res.findById.category;
          this.coverimageURL = res.findById.coverfile;
          this.coverType = res.findById.covertype;
          this.video = `<iframe src=${this.coverimageURL} frameborder="0" width="100%" >
          </iframe>`;
          this.createdAt = res.findById.createdAt;
          this.createdByImage = res.findById.createdBy.userimage;
          this.username = res.findById.createdBy.firstname+" "+res.findById.createdBy.lastname;
          console.log(this.createdByImage);
          

        }
      },
      error: (er) => {
        console.log(er);
      },
      complete: () => {
        //loading condition
      },
    });
  }

  sanitizeVideoUrl() {
    return this.sanitizer.bypassSecurityTrustHtml(this.video);
  }

  getSanitizedHtml() {
    return this.sanitizer.bypassSecurityTrustHtml(this.bodyBlog);
  }

  formatDate(dateString: any) {
    console.log(dateString);

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    return this.datePipe.transform(date, 'dd MMM yyyy');
  }

  // Desrilize()
  // {
  //   return document.body.con
  // }
}
