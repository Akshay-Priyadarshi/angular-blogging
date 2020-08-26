import { PostStruct } from './PostStruct';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  baseURL = 'http://localhost:3000/apidb/';

  addPost(newPost: PostStruct) {
    return this.http.post<{ message: string; postSaved: any }>(
      `${this.baseURL}post`,
      newPost
    );
  }

  editPost(editedPost: PostStruct) {
    return this.http.put<{ message: string; postUpdated: any }>(
      `${this.baseURL}updatepost`,
      editedPost
    );
  }

  getPostById(elid: string) {
    const idObj = { postId: elid };
    return this.http.post<{ message: string; postSelected: any }>(
      `${this.baseURL}getpostbyid`,
      idObj
    );
  }

  deletePost(delPost: PostStruct) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(delPost),
    };
    return this.http.delete<{ message: string; postDeleted: any }>(
      `${this.baseURL}deletepost`,
      options
    );
  }

  getPosts() {
    return this.http.get<{ message: string; postArray: any }>(
      `${this.baseURL}getposts`
    );
  }

  constructor(private http: HttpClient) {}
}
