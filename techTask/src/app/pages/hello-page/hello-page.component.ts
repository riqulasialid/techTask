import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StorageService } from '../../service/storage.service';
import { NotificationService } from '../../notification/notification-service.service';

@Component({
  selector: 'app-hello-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './hello-page.component.html',
  styleUrl: './hello-page.component.scss',
})
export class HelloPageComponent implements OnInit {
  currentUser: any = [];

  constructor(
    private router: Router,
    private storageService: StorageService,
    private nofitication: NotificationService
  ) {}

  ngOnInit(): void {
    const userData = this.storageService.getItem('currentUser');
    this.currentUser = userData ? JSON.parse(userData) : [];
  }

  onLogout(): void {
    this.storageService.setItem('isAuthenticated', 'false');
    this.storageService.removeItem('currentUser');
    this.router.navigate(['/auth']);
  }

  onDeleteAccount() {
    const currentUser = this.storageService.getItem('currentUser');
    const users = this.storageService.getItem('users');

    if (currentUser && users) {
      const parsedUser = JSON.parse(currentUser);
      const parsedUsers = JSON.parse(users);

      const updatedUsers = parsedUsers.filter(
        (user: any) => user.username !== parsedUser.username
      );

      this.storageService.setItem('users', JSON.stringify(updatedUsers));
    }

    this.storageService.setItem('isAuthenticated', 'false');
    this.storageService.removeItem('currentUser');
    this.nofitication.show('Account deleted', 'success');
    this.router.navigate(['/auth']);
  }
}
