import { Component, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent {
  isOpen = false;
  selectedOption = 'Wybierz dzień';
  options: string[] = [];
  @Output() dateSelected = new EventEmitter<string>();

private excludedDates: string[] = [
  '12-22', '12-24', '12-29', '12-31', '01-01', '01-06', '05-01', '05-03', '11-01', '11-11'                 
];

  constructor(private eRef: ElementRef) {
    this.options = this.generateNextDates(10);
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.isOpen = false;
    this.dateSelected.emit(option);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  private generateNextDates(count: number): string[] {
    const results: string[] = [];
    const monthNames = [
      'stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca',
      'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'
    ];
    const weekdayAbbrev: Record<number, string> = { 1: 'pon', 3: 'śr' };

    const isDesired = (dayIndex: number) => dayIndex === 1 || dayIndex === 3;
    const isExcluded = (date: Date) => {
      const monthDay = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      return this.excludedDates.includes(monthDay);
    };

    const d = new Date();
    while (results.length < count) {
      const day = d.getDay();
      if (isDesired(day) && !isExcluded(d)) {
        const dayNum = d.getDate();
        const month = monthNames[d.getMonth()];
        const abbrev = weekdayAbbrev[day] ?? '';
        results.push(`${dayNum} ${month} (${abbrev})`);
      }
      d.setDate(d.getDate() + 1);
    }
    return results;
  }
}
