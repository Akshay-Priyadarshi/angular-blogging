import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  loggedIn = false;
  localToken = localStorage.getItem('token');
  userName = localStorage.getItem('name');
  path = '';

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    this.loggedIn = false;
    this.router.navigate(['/signup']).then(() => {
      window.location.reload();
    });
  }

  ngOnInit(): void {
    if (this.localToken) {
      this.loggedIn = true;
      this.path = '/postlist';
    } else {
      this.loggedIn = false;
      this.path = '/signup';
    }
  }
}
