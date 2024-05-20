import { Component, Output, EventEmitter } from '@angular/core';
import { MetaPixelService } from '../../services/meta-pixel.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  @Output() scrollToTarget = new EventEmitter<void>();

  constructor(private metaPixelService: MetaPixelService) {}

  onButtonClick() {
    this.scrollToTarget.emit();
    this.acknowledgeButtonClick();
  }

  acknowledgeButtonClick() {
    this.metaPixelService.trackCustom('heroButtonClick');
  }
}
