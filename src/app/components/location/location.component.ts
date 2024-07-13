import { Component, Input } from '@angular/core';
import { Placement } from '../../types/placement.type';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrl: './location.component.css'
})
export class LocationComponent {
  @Input() placement: Placement = 'subpage';
}
