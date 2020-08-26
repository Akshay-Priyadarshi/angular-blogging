import { PostsService } from './../posts.service';
import { PostStruct } from './../PostStruct';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postform',
  templateUrl: './postform.component.html',
  styleUrls: ['./postform.component.css'],
})
export class PostformComponent implements OnInit {
  // tslint:disable-next-line: no-output-rename
  @Output('formdata') formdata = new EventEmitter<PostStruct>();
  // tslint:disable-next-line: no-output-rename
  // @Output('refresh') refresh = new EventEmitter();
  postTitle = '';
  postDesc = '';
  postButton = true;
  editButton = false;
  mode = 'save';
  currentPost: PostStruct;

  showPostButton() {
    if (this.postTitle.trim() !== '' && this.postDesc.trim() !== '') {
      this.postButton = false;
      this.editButton = false;
    } else {
      this.postButton = true;
      this.editButton = true;
    }
  }

  onSave() {
    const post = new PostStruct();
    post.postId = null;
    post.postTitle = this.postTitle.trim();
    post.postDesc = this.postDesc.trim();
    post.createdAt = new Date().toString();
    this.postsService.addPost(post).subscribe(() => {
      this.router.navigate(['/postlist']);
    });
    this.postTitle = '';
    this.postDesc = '';
    this.postButton = true;
  }

  onEdit() {
    const post = new PostStruct();
    post.postId = this.currentPost.postId;
    post.postTitle = this.postTitle.trim();
    post.postDesc = this.postDesc.trim();
    post.createdAt = new Date().toString();
    this.postsService.editPost(post).subscribe(() => {
      this.router.navigate(['/postlist']);
    });
    this.postTitle = '';
    this.postDesc = '';
    this.editButton = true;
  }

  constructor(
    private postsService: PostsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mode = this.activatedRoute.snapshot.paramMap.get('mode');
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.mode.trim() === 'edit') {
      this.postsService
        .getPostById(id)
        .pipe(
          map((responseData) => {
            const postElement = responseData.postSelected;
            // tslint:disable-next-line: prefer-const
            let updatedPostElement = new PostStruct();
            updatedPostElement.postId = postElement._id;
            updatedPostElement.postDesc = postElement.postDesc;
            updatedPostElement.postTitle = postElement.postTitle;
            updatedPostElement.createdAt = postElement.createdAt;
            return updatedPostElement;
          })
        )
        .subscribe((selectedPost) => {
          this.currentPost = Object.assign(selectedPost);
          this.postTitle = selectedPost.postTitle;
          this.postDesc = selectedPost.postDesc;
        });
    }
  }
}
