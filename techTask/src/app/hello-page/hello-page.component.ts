import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-hello-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './hello-page.component.html',
  styleUrl: './hello-page.component.scss',
})
export class HelloPageComponent {
  firstName = '';

  constructor(private router: Router) {}

  onLogout(): void {
    localStorage.setItem('isAuthenticated', 'false');
    this.router.navigate(['/auth']);
  }
}
