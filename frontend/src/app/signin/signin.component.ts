import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  email = '';
  password = '';
  loginButton = true;
  errorMessage: string;
  hasError = false;
  emailHasError = false;
  regexpEmail: RegExp = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$');

  inputChange() {
    if (
      this.email.trim() !== '' &&
      this.password.trim() !== '' &&
      this.checkEmail()
    ) {
      this.loginButton = false;
    } else {
      this.loginButton = true;
    }
  }

  loginClick() {
    const userToBeLoggedIn = {
      email: this.email,
      password: this.password,
    };
    this.userService.signInUser(userToBeLoggedIn).subscribe((responseData) => {
      if (responseData.loggedInUser !== null) {
        localStorage.setItem('token', responseData.token);
        localStorage.setItem(
          'name',
          `${responseData.loggedInUser.firstName} ${responseData.loggedInUser.lastName}`
        );
        this.router.navigate(['/postlist']).then(() => {
          window.location.reload();
        });
      } else {
        this.errorMessage = responseData.error;
        this.hasError = true;
        setInterval(() => {
          this.hasError = false;
        }, 3000);
      }
    });
  }

  checkEmail() {
    if (this.email.trim() !== '') {
      if (this.regexpEmail.test(this.email) === true) {
        this.emailHasError = false;
        return true;
      } else {
        this.emailHasError = true;
        return false;
      }
    } else {
      this.emailHasError = true;
      return false;
    }
  }

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.email = '';
    this.password = '';
    this.loginButton = true;
    this.errorMessage = '';
    this.hasError = false;
    this.emailHasError = false;
  }
}
