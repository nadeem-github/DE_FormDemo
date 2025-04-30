import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-side-menu',
  templateUrl: './admin-side-menu.component.html',
  styleUrls: ['./admin-side-menu.component.scss']
})
export class AdminSideMenuComponent {
  @Input() collapsed = false;

  menuItems = [
    { label: 'Dashboard', icon: 'fa fa-home' },
    { label: 'Active user', icon: 'fa fa-users' },
    { label: 'Add a record', icon: 'fa fa-plus-circle' },
    { label: 'Import record', icon: 'fa fa-cloud-upload' },
    { label: 'Export record', icon: 'fa fa-cloud-download' },
    { label: 'Asset map', icon: 'fa fa-map' },
    { label: 'Logout', icon: 'fa fa-sign-out' }
  ];

  activeItem = 'Dashboard';

  setActive(label: string) {
    this.activeItem = label;
  }
}
