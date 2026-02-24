import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

type SimpleSelectOption = {
  label: string;
  value: string;
};

@Component({
  selector: 'app-simple-select',
  templateUrl: './simple-select.component.html',
  styleUrls: ['./simple-select.component.css']
})
export class SimpleSelectComponent {
  @Input() options: SimpleSelectOption[] = [];
  @Input() placeholder = 'Wybierz';
  @Input() selectedValue: string | null = null;
  @Input() invalid = false;
  @Input() buttonId = '';
  @Output() valueSelected = new EventEmitter<string>();

  isOpen = false;

  constructor(private eRef: ElementRef) {}

  get selectedLabel(): string {
    const selected = this.options.find((option) => option.value === this.selectedValue);
    return selected ? selected.label : this.placeholder;
  }

  get hasSelection(): boolean {
    return !!this.options.find((option) => option.value === this.selectedValue);
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: SimpleSelectOption): void {
    this.selectedValue = option.value;
    this.isOpen = false;
    this.valueSelected.emit(option.value);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
