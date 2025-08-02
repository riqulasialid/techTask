import { Routes } from '@angular/router';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { HelloPageComponent } from './pages/hello-page/hello-page.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthPageComponent },
  {
    path: 'hello-page',
    component: HelloPageComponent,
    canActivate: [authGuard],
  },
];
