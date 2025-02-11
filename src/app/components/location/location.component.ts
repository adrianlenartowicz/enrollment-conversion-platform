import { Component, Input } from '@angular/core';
import { Placement } from '../../types/placement.type';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent {
  @Input() placement: Placement = 'subpage';

  constructor(private metaService: Meta, private titleService: Title) {}

  ngOnInit() {
    if (this.placement === 'subpage') {
      this.titleService.setTitle('Lokalizacja treningów dla dzieci | Akademia Lekkiej Atletyki Wrocław');
      this.metaService.updateTag({ name: 'description', content: 'Lekkoatletyka dla dzieci | Wrocław - Biskupin, ul. Stefanii Sempołowskiej 54. Sprawdź, gdzie odbywają się zajęcia i dołącz do nas!' });
    }
  }
}
