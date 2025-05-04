import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-dash-menu',
  templateUrl: './user-dash-menu.component.html',
  styleUrls: ['./user-dash-menu.component.scss']
})
export class UserDashMenuComponent {
  @Input() collapsed = false;

  activeItem = 'Dashboard';

  setActive(label: string) {
    this.activeItem = label;
  }
}
