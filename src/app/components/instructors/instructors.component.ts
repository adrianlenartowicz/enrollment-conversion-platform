import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'app-instructors',
    templateUrl: './instructors.component.html',
    styleUrl: './instructors.component.css',
    standalone: false
})
export class InstructorsComponent {
  constructor(private metaService: Meta, private titleService: Title) {
    this.titleService.setTitle('Nasi trenerzy | Akademia Lekkiej Atletyki Wrocław');
    this.metaService.updateTag({ name: 'description', content: 'Poznaj naszych trenerów, którzy zadbają o rozwój sportowy Twojego dziecka. Treningi lekkoatletyczne z pasją i indywidualnym podejściem w Akademii Lekkiej Atletyki Wrocław.' });
  }
}
