import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Char } from '../../chars.model';

@Component({
  selector: 'app-char-item',
  templateUrl: './char-item.component.html',
  styleUrls: ['./char-item.component.css'],
})
export class CharItemComponent {
  @Input() char!: Char;
  @Input() index!: number;
  @Output() charSelected = new EventEmitter<void>();

  onSelected() {
    this.charSelected.emit();
  }
}
