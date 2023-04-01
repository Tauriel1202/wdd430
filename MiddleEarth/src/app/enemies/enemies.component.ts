import { Component, OnInit } from '@angular/core';
import { Enemy } from './enemies.model';
import { EnemyService } from './enemies.service';

@Component({
  selector: 'app-enemies',
  templateUrl: './enemies.component.html',
  styleUrls: ['./enemies.component.css'],
  providers: [EnemyService],
})
export class EnemiesComponent implements OnInit {
  selectedEnemy!: Enemy;

  constructor(private enemyService: EnemyService) {}

  ngOnInit() {
    console.log('The Elves found the Enemies Component!');

    this.enemyService.selectedEvent.subscribe((enemy: Enemy) => {
      this.selectedEnemy = enemy;
      console.log('the Elves are listening for the list of enemies!');
    });
  }
}
