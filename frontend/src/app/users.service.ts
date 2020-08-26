import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseURL = 'http://localhost:3000/users/';

  signInUser(userToBeSignedIn) {
    return this.http.post<{
      error: string;
      message: string;
      loggedInUser: any;
      token: string;
    }>(`${this.baseURL}signin`, userToBeSignedIn);
  }

  signUpUser(userToBeSignedUp) {
    return this.http.post<{ error: string; message: string; userCreated: any }>(
      `${this.baseURL}register`,
      userToBeSignedUp
    );
  }
  constructor(private http: HttpClient) {}
}
