import { Component } from '@angular/core';
import { CapsuleToggleComponent } from './capsule-toggle/capsule-toggle.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login-form',
  imports: [CapsuleToggleComponent, NgIf],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  selectedIndex = 0;

  onToggleChanged(newIndex: number) {
    this.selectedIndex = newIndex;
    console.log('Выбран индекс:', newIndex);
  }
}
