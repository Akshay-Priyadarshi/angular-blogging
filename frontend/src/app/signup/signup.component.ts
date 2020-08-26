import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';
  signupButton = true;
  hasError = false;
  errorMessage = '';
  firstNameHasError = false;
  lastNameHasError = false;
  emailHasError = false;
  passwordHasError = false;
  confirmPasswordHasError = false;
  regexpEmail: RegExp = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$');
  successMessage = '';
  isSuccess = false;

  inputChange() {
    if (
      this.firstName.trim() !== '' &&
      this.lastName.trim() !== '' &&
      this.email.trim() !== '' &&
      this.password.trim() !== '' &&
      this.confirmPassword.trim() !== '' &&
      this.checkFirstName() &&
      this.checkLastName() &&
      this.checkEmail() &&
      this.checkPassword() &&
      this.checkConfirmPassword()
    ) {
      this.signupButton = false;
    } else {
      this.signupButton = true;
    }
  }

  signupClick() {
    const userToBeSignedUp = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    };
    this.userService.signUpUser(userToBeSignedUp).subscribe((responseData) => {
      if (responseData.userCreated !== null) {
        this.successMessage = responseData.message;
        this.isSuccess = true;
        setInterval(() => {
          this.isSuccess = false;
        }, 3000);
        this.refresh();
      } else {
        this.errorMessage = responseData.error;
        this.hasError = true;
        setInterval(() => {
          this.hasError = false;
        }, 3000);
      }
    });
  }

  checkFirstName() {
    if (this.firstName.trim() !== '') {
      this.firstNameHasError = false;
      return true;
    } else {
      this.firstNameHasError = true;
      return false;
    }
  }
  checkLastName() {
    if (this.lastName.trim() !== '') {
      this.lastNameHasError = false;
      return true;
    } else {
      this.lastNameHasError = true;
      return false;
    }
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
  checkPassword() {
    if (this.password.trim() !== '') {
      if (this.password.length >= 8) {
        this.passwordHasError = false;
        return true;
      } else {
        this.passwordHasError = true;
        return false;
      }
    } else {
      this.passwordHasError = true;
      return false;
    }
  }
  checkConfirmPassword() {
    if (this.password === this.confirmPassword) {
      this.confirmPasswordHasError = false;
      return true;
    } else {
      this.confirmPasswordHasError = true;
      return false;
    }
  }

  refresh() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.signupButton = true;
    this.hasError = false;
    this.errorMessage = '';
    this.firstNameHasError = false;
    this.lastNameHasError = false;
    this.emailHasError = false;
    this.passwordHasError = false;
    this.confirmPasswordHasError = false;
  }

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.refresh();
  }
}
