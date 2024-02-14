import { CommonModule, NgClass } from '@angular/common';
import { Component,  OnInit } from '@angular/core';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import {  getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import {Storage} from "@angular/fire/storage";
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';




@Component({
  selector: 'app-edit-add-blog',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    NgClass,
    CommonModule,
    MessagesModule,
    ToastModule
  ],
  providers:[MessageService],
  templateUrl: './edit-add-blog.component.html',
  styleUrl: './edit-add-blog.component.css'
})
export class EditAddBlogComponent implements OnInit  {
  EditoRCreate:string="Create";
  buttonPublishOrUpdateBlog:string="Publish";
  titleBlog:string="";
  bodyBlog:string="";
  mode:string="";
  coverimage:any="";
  coverimageURL:string="";


  maxLength = 500;
  // Regex for can get element tag from bodyBlog
  htmlTagRegex = /<[^>]+>/g;
  // Regex for can get element tag from content 
  imgRegex = /<img[^>]+src="data:image\/(jpeg|png);base64,([^"]+)">/g;
  urls:string[]= [];

  
  // inject Firestorage for firebase 
  constructor(private fireStorage:Storage , private messageService: MessageService){}

  messages: any;

  OnInit() {

}

  // return count of images 
  countCharacterLength(content: string): number {
    if(!content)
    return 0;

    return content.replace(this.htmlTagRegex, '').length;
  }

  //return count of character of content
  countImg(content: string):number
  {
    if(!content)
    return 0;

    const regex = /<img/gi;
    return (content.match(regex) || []).length;
  }

  ngOnInit() {
  }

  //Validation Function for content that are inserted 
  validateContent(): boolean
  {
    if(this.countImg(this.bodyBlog)>3)
    {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Must be lessthan 3 images in Content' });
      return false;
    }

    if(this.countCharacterLength(this.bodyBlog) > 500)
    {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Content length exceeds 500 characters. Please shorten your content' });
      return false;
    }

    return true;
  }

  validateHeaderImage(data:any):boolean
  {
    
    // Check type
    switch (data.type) {
      case "image/jpeg":
      case "image/png":
      case "image/jpg":
        if (data.size > 2000000) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Image should be less than 2 megabytes' });
          return false;
        }
        break;
      case "video/mp4":
        if (data.size > 3000000) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Video should be less than 3 megabytes' });
          return false;
        }
        break;
      default:
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Type of file should be one of the following: JPEG, PNG, JPG, MP4' });
        return false;
    }

    return true;

  }


  //Getting Base64 image from body then convert it to file using base64File
  exractImage(){
    const imgRegex = /<img[^>]+src="data:image\/(jpeg|png);base64,([^"]+)">/g;
    const matches = this.bodyBlog.matchAll(imgRegex);
    let file: File[] = []; 
    for (const match of matches) {
      let base64Data = match[2];
      const filename = `image${Date.now()}.${match[1]}`; 
      file.push(this.base64ToFile(base64Data,filename,`image/${match[1]}`));
    }
    return file;
  }


  // Convert Base64 to file type to can upload it 
  base64ToFile(base64Data: string, filename: string, contentType: string): File {

    // Convert base64 data to Blob
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: contentType });
  
    // Construct File object from Blob
    const file = new File([blob], filename, { type: contentType });
    return file;
  }

  // For upload images to firebase 
  //#region
  // async onSubmit(){
  //   debugger
  // let file = this.exractImage();
  // let urls:string[]= [];
  //   console.log(file);
  //   await Promise.all(file.map(async (_file) => {
  //     if (_file) {
  //       const path = `yt/${_file.name}`;
  //       const storageRef = ref(this.fireStorage, path);
  //       const uploaded = await uploadBytes(storageRef, _file);
  //       const downloadUrl = await getDownloadURL(uploaded.ref);
        
  //       urls.push(downloadUrl);
  //       console.log(downloadUrl);
  //     }
  //   })).then(()=>
  //   {
      
  //     let currentIndex = 0;
  //     this.bodyBlog = this.bodyBlog.replace(this.imgRegex, (match, group1) => {
  //       const url = urls[currentIndex];
  //       currentIndex++;
  //       return `<img src="${url}">`;
  //     });
  //   });
  
  // }
  //#endregion

  async onSubmit(){

    if(this.validateContent())
    {
      try
      {
        let file = this.exractImage();

        console.log(file);
        
        for (let i = 0; i < file.length; i++) {
          const _file = file[i];
          if (_file) {
            const path = `yt/${_file.name}`;
            const storageRef = ref(this.fireStorage, path);
            const uploaded = await uploadBytes(storageRef, _file);
            const downloadUrl = await getDownloadURL(uploaded.ref);
            this.urls.push(downloadUrl);
            console.log(downloadUrl);
            
            // Replace corresponding URL in bodyBlog
            
          }
        }
     this.replaceImageInBodyBlog();

     if(this.coverimage)
     {
       await this.uploadFiletoFirebase(this.coverimage);
     }
     {

     }
      }
      catch(err)
      {
        throw err;
      }

    }

  }
  
  replaceImageInBodyBlog()  {
    let currentIndex = 0;
        this.bodyBlog = this.bodyBlog.replace(this.imgRegex, (match, group1) => {
          const url = this.urls[currentIndex];
          currentIndex++;
          return `<img src="${url}">`;
        });
  }

// For upload cover image to firebase
  async uploadFiletoFirebase(data:any){ 
    const path = `yt/${data.name}`;
    const storageRef = ref(this.fireStorage, path);
    const uploaded = await uploadBytes(storageRef, data);
    const downloadUrl = await getDownloadURL(uploaded.ref);
    this.coverimageURL = downloadUrl;
  }
  
  //For test that can upload any thing 
  async changeFile(data:any){
    if (this.validateHeaderImage(data.target.files[0])) {
      this.coverimage = data.target.files[0];
    } else {
      data.target.value = null;

    }
    
    
  }



}

