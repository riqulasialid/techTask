import { Component, OnInit } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  imports: [LoginFormComponent],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      this.router.navigate(['/hello-page']);
    }
  }
}
