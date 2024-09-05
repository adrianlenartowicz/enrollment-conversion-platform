import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.css'
})
export class InfoCardComponent {
  @Input() info: string = '';
  @Input() secondInfo: string = '';
  @Input() header: string = '';
  
}
