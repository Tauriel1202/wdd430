import { Component, Input, Output } from '@angular/core';
import { Land } from '../../lands.model';

@Component({
  selector: 'app-land-item',
  templateUrl: './land-item.component.html',
  styleUrls: ['./land-item.component.css']
})
export class LandItemComponent {
  @Input() land!: Land;
}
