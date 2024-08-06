import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { MetaPixelService } from './meta-pixel.service';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timeSpentSubject = new BehaviorSubject<number>(0);
  timeSpent$ = this.timeSpentSubject.asObservable();
  private timerActive = false;
  private timerSubscription: Subscription | undefined;

  constructor(private metaPixelService: MetaPixelService) { }

  startTimer() {
    if (!this.timerActive) {
      this.timerActive = true;
      this.timerSubscription = interval(1000)
        .pipe(takeWhile(() => this.timerActive))
        .subscribe(() => {
          if (this.timeSpentSubject.value > 30) {
            this.stopTimer();
            this.acknowledgeConvertion();
          }
          const newTime = this.timeSpentSubject.value + 1;
          this.timeSpentSubject.next(newTime);
        });
    }
  }

  stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.timerActive = false;
  }

  getTimeSpent() {
    return this.timeSpentSubject.value;
  }

  acknowledgeConvertion() {
    this.setConversionTracked();
    this.metaPixelService.trackCustom('articleRead');
  }

  private setConversionTracked() {
    localStorage.setItem('conversionTracked', 'true');
  }
}
