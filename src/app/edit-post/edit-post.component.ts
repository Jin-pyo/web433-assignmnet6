import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router, ActivatedRoute } from '@angular/router';
import {BlogPost} from '../BlogPost';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  blogPost:BlogPost;
  tags:string;

  constructor(private postData:PostService, private route:Router, private activatedroute:ActivatedRoute) { }

  ngOnInit(): void {

    this.postData.getPostById(this.activatedroute.snapshot.params['id']).subscribe((data)=>{
      this.blogPost=data;
      this.tags=this.blogPost.tags.toString();
    });
  }

  formSubmit(){
    this.blogPost.tags=this.tags.split(',').map(tag=>tag.trim());
    this.postData.updatePostById(this.blogPost._id, this.blogPost).subscribe(()=>this.route.navigate(['admin']));
    
  }

  deletePost(){
    this.postData.deletePostById(this.blogPost._id).subscribe((data)=>this.route.navigate(['admin']));
  }

}
