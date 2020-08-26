import { PostsService } from './../posts.service';
import { PostStruct } from './../PostStruct';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css'],
})
export class PostlistComponent implements OnInit {
  posts: PostStruct[] = [];

  constructor(private postService: PostsService) {}

  deletePost(delPost: PostStruct) {
    this.postService.deletePost(delPost).subscribe(() => {
      this.getPost();
    });
  }

  getPost() {
    this.postService
      .getPosts()
      .pipe(
        map((responseData) => {
          return responseData.postArray.map((postElement) => {
            // tslint:disable-next-line: prefer-const
            let updatedPostElement = new PostStruct();
            updatedPostElement.postId = postElement._id;
            updatedPostElement.postDesc = postElement.postDesc;
            updatedPostElement.postTitle = postElement.postTitle;
            updatedPostElement.createdAt = postElement.createdAt;
            return updatedPostElement;
          });
        })
      )
      .subscribe((updatedPostArray) => {
        this.posts = updatedPostArray;
      });
  }

  ngOnInit(): void {
    this.getPost();
  }
}
