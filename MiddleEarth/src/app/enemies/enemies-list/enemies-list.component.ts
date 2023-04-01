import { Component, OnDestroy, OnInit } from '@angular/core';
import { Enemy } from '../enemies.model';
import { Subscription } from 'rxjs';
import { EnemyService } from '../enemies.service';

@Component({
  selector: 'app-enemies-list',
  templateUrl: './enemies-list.component.html',
  styleUrls: ['./enemies-list.component.css'],
})
export class EnemiesListComponent implements OnInit, OnDestroy {
  enemies: Enemy[] = [];
  subscr!: Subscription;

  constructor(private enemyService: EnemyService) {
    this.enemyService.getEnemies();
  }

  ngOnInit() {
    this.enemyService.getEnemies();
    this.subscr = this.enemyService.changedEvent.subscribe(
      (enemies: Enemy[]) => {
        this.enemies = enemies;
      }
    );
  }

  ngOnDestroy() {
    this.subscr.unsubscribe();
  }
}
