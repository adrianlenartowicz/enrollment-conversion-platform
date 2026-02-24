import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
  isMobileMenuOpen = false;
  private pendingSectionId: string | null = null;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.isMobileMenuOpen = false;
        if (this.pendingSectionId && this.isHomeRoute(event.urlAfterRedirects)) {
          const sectionId = this.pendingSectionId;
          setTimeout(() => this.scrollToSection(sectionId), 0);
          this.pendingSectionId = null;
        }
      });
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMobileMenu();
  }

  goToSection(sectionId: string): void {
    if (this.isHomeRoute(this.router.url)) {
      this.scrollToSection(sectionId);
      this.closeMobileMenu();
      return;
    }

    this.pendingSectionId = sectionId;
    this.router.navigateByUrl('/');
  }

  private isHomeRoute(url: string): boolean {
    const cleanPath = url.split('?')[0].split('#')[0];
    return cleanPath === '' || cleanPath === '/';
  }

  private scrollToSection(sectionId: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const attemptScroll = (remainingAttempts: number) => {
      const sectionElement = document.getElementById(sectionId);
      if (sectionElement) {
        const offsetTop = sectionElement.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        return;
      }

      if (remainingAttempts > 0) {
        setTimeout(() => attemptScroll(remainingAttempts - 1), 100);
      }
    };

    attemptScroll(20);
  }
}
