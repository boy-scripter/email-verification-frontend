import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  template: ``,
})
export class LogoutComponent implements OnInit {
  router = inject(Router);

  ngOnInit() {
    this.logout();
  }

  logout() {
    this.router.navigate(['home']);
  }
}
