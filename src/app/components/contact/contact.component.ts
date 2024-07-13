import { Component, Input, OnInit } from '@angular/core';
import { Placement } from '../../types/placement.type';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  @Input() placement: Placement = 'subpage';

  contactHeader: string = 'Wypełnij formularz aby dokonać zapisu!'
  contactSubheader: string = 'Zajęcia ruszają od 2 września'

  ngOnInit() {
    if (this.placement === 'landing') {
      this.contactHeader = 'Odbierz dwa bezpłatne treningi próbne!'
      this.contactSubheader = 'Wypełnij formularz'
    }
  }
}
