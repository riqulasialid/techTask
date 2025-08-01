import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NotificationService,
  NotificationData,
} from './notification-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications: NotificationData[] = [];
  private sub!: Subscription;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.sub = this.notificationService.notification$.subscribe((list) => {
      this.notifications = list;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
