import { Component } from '@angular/core';

@Component({
  selector: 'app-header-rememb',
  templateUrl: './header-rememb.component.html',
  styleUrls: ['./header-rememb.component.scss']
})
export class HeaderRemembComponent {
  isMenuCollapsed = true;

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
