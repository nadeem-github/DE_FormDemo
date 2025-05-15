import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dash-menu',
  templateUrl: './user-dash-menu.component.html',
  styleUrls: ['./user-dash-menu.component.scss']
})
export class UserDashMenuComponent {
  @Input() collapsed = false;

  activeItem = 'Dashboard';

  constructor(private router: Router) { }

  setActive(label: string) {
    this.activeItem = label;
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login', { replaceUrl: true }).then(() => {
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
