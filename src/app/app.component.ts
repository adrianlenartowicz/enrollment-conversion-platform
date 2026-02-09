import { Component } from '@angular/core';
import { TimerService } from '../app/services/timer.service';

const STORAGE_CONVERSION_DEBUG_KEY = 'tracking_debug';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ala-wroclaw';
  private conversionTracked = false;
  

  constructor(
    private timerService: TimerService,
  ) {}

  ngOnInit(): void {
    this.trackDebugConversionSource();
    this.conversionTracked = this.checkConversionTracked();
    if (!this.conversionTracked) {
      this.timerService.startTimer();
    }
  }

  private checkConversionTracked(): boolean {
    return localStorage.getItem('conversionTracked') === 'true';
  }

  private trackDebugConversionSource() {
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
}
