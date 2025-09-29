import { Component, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent {
  isOpen = false;
  selectedOption = 'Wybierz dzień';
  options = [
    '1 października (śr)', 
    '6 października (pon)', 
    '8 października (śr)', 
    '13 października (pon)', 
    '15 października (śr)', 
    '20 października (pon)', 
    '22 października (śr)',
    '27 października (pon)', 
    '29 października (śr)'
  ];
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
