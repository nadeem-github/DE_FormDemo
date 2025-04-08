import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-rememb',
  templateUrl: './footer-rememb.component.html',
  styleUrls: ['./footer-rememb.component.scss']
})
export class FooterRemembComponent {
  get currentYear(): number {
    return new Date().getFullYear();
  }
}
