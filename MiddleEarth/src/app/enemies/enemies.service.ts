import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';
import { Enemy } from './enemies.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EnemyService {
  selectedEvent = new Subject<Enemy>();
  changedEvent = new Subject<Enemy[]>();

  enemies: Enemy[] = [];

  constructor(private http: HttpClient) {}

  getEnemies() {
    this.http
      .get<{ message: String; enemies: Enemy[] }>(
        'http://localhost:3000/enemies'
      )
      .pipe(
        map((data) => {
          console.log('Get all enemies: ', data.enemies);
          return data.enemies.map((enemy) => {
            return {
              id: enemy.id,
              enemyId: enemy.enemyId,
              imgUrl: enemy.imgUrl,
              land: enemy.land,
              name: enemy.name,
              role: enemy.role,
              species: enemy.species,
            };
          });
        })
      )
      .subscribe((enemyData) => {
        this.enemies = enemyData;
        this.changedEvent.next([...this.enemies]);
      });
  }

  getLength() {
    return this.enemies.length;
  }

  getEnemy(id: number) {
    return this.enemies[id];
  }

  addEnemy(newEnemy: Enemy) {
    const enemy: Enemy = newEnemy;

    this.http
      .post<{ message: string; eId: string }>(
        'http://localhost:3000/enemies',
        enemy
      )
      .subscribe((resData) => {
        console.log('Posted enemy: ', resData.message);
        const id = resData.eId;
        enemy.id = id;
        this.enemies.push(enemy);
        this.changedEvent.next([...this.enemies]);
      });
  }

  updateEnemy(orig: Enemy, newEnemy: Enemy) {
    const pos = this.enemies.findIndex((e) => e.enemyId === orig.enemyId);

    if (pos < 0) {
      return;
    }

    console.log('👹', newEnemy);
    console.log('The Elves are editting the enemies.');

    this.http
      .put<Enemy[]>(`http://localhost:3000/enemies/` + orig.enemyId, newEnemy)
      .subscribe((response) => {
        console.log('👍', response);
        this.enemies[pos] = newEnemy;
        this.changedEvent.next(this.enemies.slice());
      });
  }

  deleteEnemy(enemy: Enemy) {
    console.log(enemy);
    this.http
      .delete<{ message: string }>(
        'http://localhost:3000/enemies/' + enemy.enemyId
      )
      .subscribe((res) => {
        // this.chars.splice(pos, 1);
        this.changedEvent.next(this.enemies.slice());
      });
  }
}
