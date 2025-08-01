import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPageComponent } from './auth-page.component';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthPageComponent, LoginFormComponent],
})
export class AuthPageModule {}
