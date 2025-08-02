import { Component, OnInit } from '@angular/core';
import { LoginFormComponent } from './login-form/login-form.component';
import { Router } from '@angular/router';
import { StorageService } from '../../service/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent implements OnInit {
  constructor(private router: Router, private storageService: StorageService) {}

  ngOnInit(): void {
    const isAuthenticated =
      this.storageService.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      this.router.navigate(['/hello-page']);
    }
  }
}
