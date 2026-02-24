import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-join-steps',
  templateUrl: './join-steps.component.html',
  styleUrl: './join-steps.component.css'
})
export class JoinStepsComponent {
  showThankYou = false;

  constructor(private metaService: Meta, private titleService: Title) {
    this.titleService.setTitle('Zapisy na treningi lekkoatletyczne dla dzieci | Akademia Lekkiej Atletyki Wrocław');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Wypełnij formularz zapisu. Otrzymasz e-mail z wyborem terminu treningu, a jeśli nie wybierzesz terminu w 15 minut, oddzwonimy.'
    });
  }

  handleFormSubmitted(): void {
    this.showThankYou = true;

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
