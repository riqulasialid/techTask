import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CapsuleToggleComponent } from './capsule-toggle/capsule-toggle.component';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '../../notification/notification-service.service';

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
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
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

  onToggleChanged(index: number) {
    this.selectedIndex = index;
    this.loginForm.reset();
    this.registrationForm.reset();
  }

  onSubmit() {
    if (this.selectedIndex === 0) {
      this.login();
    } else {
      this.register();
    }
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.value;
    const encryptedPassword = btoa(password);

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.username === username);

    if (!user) {
      this.notificationService.show('User not found', 'error');
      return;
    }

    if (user.password !== encryptedPassword) {
      this.notificationService.show('Incorrect password', 'error');
      return;
    }

    localStorage.setItem('isAuthenticated', 'true');
    this.notificationService.show('Login successful', 'success');
  }

  register() {
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

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find((u: any) => u.username === username)) {
      this.notificationService.show('User already exists', 'error');
      return;
    }

    users.push({
      username,
      email,
      firstName,
      secondName,
      password: btoa(password),
    });

    localStorage.setItem('users', JSON.stringify(users));
    this.notificationService.show('Registration successful', 'success');
    this.selectedIndex = 0;
  }
}
