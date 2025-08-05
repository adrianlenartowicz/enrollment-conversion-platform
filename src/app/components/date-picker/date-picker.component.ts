import { Component, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent {
  isOpen = false;
  selectedOption = 'Wybierz dzień';
  options = ['3 września (śr)', '8 września (pon)', '10 września (śr)', '15 września (pon)', '17 września (śr)', '22 września (pon)', '24 września (śr)'];
  @Output() dateSelected = new EventEmitter<string>();

  constructor(private eRef: ElementRef) {}
  
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
}
