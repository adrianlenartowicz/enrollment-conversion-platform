import { Component } from '@angular/core';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrl: './top-bar.component.css',
    standalone: false
})
export class TopBarComponent {
  isMobileMenuOpen = false;


  showMobileMenu() {
    this.isMobileMenuOpen = true;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }
}
