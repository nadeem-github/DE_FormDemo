import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-side-menu',
  templateUrl: './admin-side-menu.component.html',
  styleUrls: ['./admin-side-menu.component.scss']
})
export class AdminSideMenuComponent {
  @Input() collapsed = false;

  activeItem = 'Dashboard';

  constructor(private router: Router) { }

  setActive(label: string) {
    this.activeItem = label;
  }

  logout() {
    localStorage.clear();

    // Navigate with history replace to clear back button issue
    this.router.navigateByUrl('/login', { replaceUrl: true }).then(() => {
      // Force browser to reload and clear cache history
      window.location.reload();
    });
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
