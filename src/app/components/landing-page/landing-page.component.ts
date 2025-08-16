import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
    constructor(private metaService: Meta, private titleService: Title) {
      this.titleService.setTitle('Lekkoatletyka dla dzieci | Akademia Lekkiej Atletyki Wrocław');
      this.metaService.updateTag({ name: 'description', content: 'Lekkoatletyka dla dzieci we Wrocławiu. Pierwszy trening BEZ OPŁAT! Skontaktuj się z nami i umów się na zajęcia próbne już dziś!' });
    }
}
