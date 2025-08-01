// notification.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type NotificationType = 'success' | 'warning' | 'error';

export interface NotificationData {
  id: number;
  message: string;
  type: NotificationType;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications: NotificationData[] = [];
  private notificationSubject = new BehaviorSubject<NotificationData[]>([]);
  notification$ = this.notificationSubject.asObservable();
  private idCounter = 0;

  show(message: string, type: NotificationType = 'success') {
    const id = ++this.idCounter;

    const newNotification: NotificationData = { id, message, type };

    if (this.notifications.length >= 5) {
      this.notifications.shift();
    }

    this.notifications.push(newNotification);
    this.notificationSubject.next([...this.notifications]);

    setTimeout(() => this.remove(id), 4000);
  }

  remove(id: number) {
    this.notifications = this.notifications.filter((n) => n.id !== id);
    this.notificationSubject.next([...this.notifications]);
  }
}
