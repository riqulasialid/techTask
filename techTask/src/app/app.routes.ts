import { Routes } from '@angular/router';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { Component } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthPageComponent },
];
