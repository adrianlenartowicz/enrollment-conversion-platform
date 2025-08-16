import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css'
})
export class PricingComponent {
  constructor(private metaService: Meta, private titleService: Title) {
    this.titleService.setTitle('Cennik treningów lekkoatletycznych dla dzieci | Akademia Lekkiej Atletyki Wrocław');
    this.metaService.updateTag({ name: 'description', content: 'Pierwszy trening BEZ OPŁAT! Zapisz dziecko na bezpłatne zajęcia próbne!' });
  }
}
