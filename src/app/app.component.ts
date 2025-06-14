import { Component } from '@angular/core';
import { TimerService } from '../app/services/timer.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: false
})
export class AppComponent {
  title = 'ala-wroclaw';
  private conversionTracked = false;

  constructor(
    private timerService: TimerService,
  ) {}

  ngOnInit(): void {
    this.conversionTracked = this.checkConversionTracked();
    if (!this.conversionTracked) {
      this.timerService.startTimer();
    }
  }

  private checkConversionTracked(): boolean {
    return localStorage.getItem('conversionTracked') === 'true';
  }
}
