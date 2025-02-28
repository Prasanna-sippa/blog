import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { CommentService } from 'src/app/service/comment.service';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent {

  postId = this.activatedRoute.snapshot.params['id'];
  postData:any;
  comments: any;

  commentForm!: FormGroup;

    constructor(private postService: PostService,
      private activatedRoute: ActivatedRoute,
      private snackBar : MatSnackBar,
      private fb : FormBuilder,
      private commentService: CommentService,){}

    ngOnInit(){
      console.log(this.postId);
      this.getPostById();

      this.commentForm = this.fb.group({
        postedBy: [null, Validators.required],
        content: [null, Validators.required]
      })
    }

    publishComment(){
      const postedBy= this.commentForm.get('postedBy')?.value;
      const content= this.commentForm.get('content')?.value;

      this.commentService.createComment(this.postId, postedBy,content).subscribe(res=>{
        this.snackBar.open("Comment Published successfully!", "Ok");
        this.commentForm.reset();
        Object.keys(this.commentForm.controls).forEach(key => {
          const control = this.commentForm.get(key);
          control?.setErrors(null);
        });
        this.getCommentsByPost();
      }, error=>{
        this.snackBar.open("Something went wrong!", "Ok");
      })
    }

    getCommentsByPost(){
      this.commentService.getAllCommentsByPost(this.postId).subscribe(res=>{
        this.comments = res;
      }, error=>{
        this.snackBar.open("Something went wrong!", "Ok");
      })
    }

    getPostById(){
      this.postService.getPostById(this.postId).subscribe(res=>{
        this.postData = res;
        console.log(res);
        this.getCommentsByPost();
      },error=>{
        this.snackBar.open("Somthing went wrong!!!","ok");
      })
    }

    likePost(){
      this.postService.likePost(this.postId).subscribe(res=>{
        this.snackBar.open("Post liked successfully!","ok");
        this.getPostById();
      }, (error)=>{
        this.snackBar.open("Somthing went wrong!!!","ok");
      })
    }
}
