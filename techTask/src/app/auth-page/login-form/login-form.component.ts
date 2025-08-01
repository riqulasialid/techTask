import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CapsuleToggleComponent } from './capsule-toggle/capsule-toggle.component';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '../../notification/notification-service.service';
import { Router } from '@angular/router';
import { StorageService } from '../../service/storage.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CapsuleToggleComponent, NgIf, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit {
  selectedIndex = 0;
  loginForm!: FormGroup;
  registrationForm!: FormGroup;
  isLoginValid = false;
  isRegistrationValid = false;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.setupFormListeners();
  }

  private initForms(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  private setupFormListeners(): void {
    this.loginForm.statusChanges.subscribe(() => {
      this.isLoginValid = this.loginForm.valid;
    });

    this.registrationForm.statusChanges.subscribe(() => {
      this.isRegistrationValid =
        this.registrationForm.valid &&
        this.registrationForm.value.password ===
          this.registrationForm.value.confirmPassword;
    });
  }

  onToggleChanged(index: number): void {
    this.selectedIndex = index;
    this.loginForm.reset();
    this.registrationForm.reset();
  }

  onSubmit(): void {
    this.selectedIndex === 0 ? this.login() : this.register();
  }

  private login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.value;
    const encryptedPassword = btoa(password);
    const users = JSON.parse(this.storageService.getItem('users') || '[]');
    const user = users.find((u: any) => u.username === username);

    if (!user) {
      this.notificationService.show('User not found', 'error');
      return;
    }

    if (user.password !== encryptedPassword) {
      this.notificationService.show('Incorrect password', 'error');
      return;
    }

    this.storageService.setItem('isAuthenticated', 'true');
    this.storageService.setItem('currentUser', JSON.stringify(user));
    this.notificationService.show('Login successful', 'success');
    this.router.navigate(['/hello-page']);
  }

  private register(): void {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    const {
      username,
      email,
      firstName,
      secondName,
      password,
      confirmPassword,
    } = this.registrationForm.value;

    if (password !== confirmPassword) {
      this.notificationService.show('Passwords do not match', 'error');
      return;
    }

    const users = JSON.parse(this.storageService.getItem('users') || '[]');

    if (users.some((u: any) => u.username === username)) {
      this.notificationService.show('User already exists', 'error');
      return;
    }

    const newUser = {
      username,
      email,
      firstName,
      secondName,
      password: btoa(password),
    };

    users.push(newUser);
    this.storageService.setItem('users', JSON.stringify(users));
    this.notificationService.show('Registration successful', 'success');
    this.selectedIndex = 0;
  }
}
