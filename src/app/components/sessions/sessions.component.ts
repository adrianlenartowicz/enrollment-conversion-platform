import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.css'
})
export class SessionsComponent {
  constructor(private metaService: Meta, private titleService: Title) {
    this.titleService.setTitle('Treningi lekkoatletyczne dla dzieci | Akademia Lekkiej Atletyki Wrocław');
    this.metaService.updateTag({ name: 'description', content: 'Dzięki treningom lekkoatletycznym Twoje dziecko rozwinie szybkość, wytrzymałość, siłę oraz koordynację. Lekkoatletyka to coś więcej niż sport - to najlepsza możliwa inwestycja w zdrowie, charakter i rozwój Twojego dziecka!' });
  }
}
