import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  @Output() scrollToTarget = new EventEmitter<void>();

  onButtonClick() {
    this.scrollToTarget.emit();
  }
}
