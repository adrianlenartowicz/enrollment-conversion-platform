import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TimerService } from '../app/services/timer.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

const STORAGE_CONVERSION_DEBUG_KEY = 'tracking_debug';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ala-wroclaw';
  private conversionTracked = false;
  isLandingRoute = false;

  constructor(
    private timerService: TimerService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    this.updateCurrentRoute(this.router.url);
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.updateCurrentRoute(event.urlAfterRedirects));

    if (isPlatformBrowser(this.platformId)) {
      this.trackDebugConversionSource();
      this.conversionTracked = this.checkConversionTracked();
      if (!this.conversionTracked) {
        this.timerService.startTimer();
      }
    }
  }

  private checkConversionTracked(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    return localStorage.getItem('conversionTracked') === 'true';
  }

  private trackDebugConversionSource() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    if (!localStorage.getItem(STORAGE_CONVERSION_DEBUG_KEY)) {
      const params = new URLSearchParams(window.location.search);

      const debug: Record<string, string> = {};

      params.forEach((value, key) => {
        if (key.startsWith('dbg_')) {
          debug[key] = value;
        }
      });

      if (Object.keys(debug).length > 0) {  
        localStorage.setItem(STORAGE_CONVERSION_DEBUG_KEY, JSON.stringify({
          params: debug,
          landing_url: window.location.origin + window.location.pathname + window.location.search,
          referrer: document.referrer || null,
          timestamp: Date.now()
        }));
      }
    }
  }

  private updateCurrentRoute(url: string): void {
    const cleanPath = url.split('?')[0].split('#')[0];
    this.isLandingRoute = cleanPath === '' || cleanPath === '/';
  }
}
