import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-capsule-toggle',
  imports: [],
  templateUrl: './capsule-toggle.component.html',
  styleUrl: './capsule-toggle.component.scss',
})
export class CapsuleToggleComponent {
  @Input() selectedIndex = 0;
  @Output() selectedIndexChange = new EventEmitter<number>();

  select(index: number) {
    this.selectedIndex = index;
    this.selectedIndexChange.emit(index);
  }
}
