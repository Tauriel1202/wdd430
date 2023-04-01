import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Enemy } from '../../enemies.model';

@Component({
  selector: 'app-enemy-item',
  templateUrl: './enemy-item.component.html',
  styleUrls: ['./enemy-item.component.css']
})
export class EnemyItemComponent {
  @Input() enemy!: Enemy;
  @Input() index!: number;
  @Output() enemySelected = new EventEmitter<void>();

  onSelected(){
    this.enemySelected.emit();
  }
}
