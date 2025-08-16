import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-join-steps',
  templateUrl: './join-steps.component.html',
  styleUrl: './join-steps.component.css'
})
export class JoinStepsComponent {
  constructor(private metaService: Meta, private titleService: Title) {
    this.titleService.setTitle('Zapisy na treningi lekkoatletyczne dla dzieci | Akademia Lekkiej Atletyki Wrocław');
    this.metaService.updateTag({ name: 'description', content: 'Pierwszy trening BEZ OPŁAT! Zapisz swoje dziecko na treningi lekkoatletyczne we Wrocławiu!' });
  }
}
