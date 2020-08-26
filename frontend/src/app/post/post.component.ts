import { PostStruct } from './../PostStruct';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('post') post: PostStruct;
  // tslint:disable-next-line: no-output-rename
  @Output('delPost') delPost = new EventEmitter();
  postRoute = '';
  postCreatedAt: Date;

  constructor() {}

  delete(postToDelete: PostStruct) {
    this.delPost.emit(postToDelete);
  }

  ngOnInit(): void {
    this.postRoute = `/postform/edit/${this.post.postId}`;
    this.postCreatedAt = new Date(this.post.createdAt);
  }
}
