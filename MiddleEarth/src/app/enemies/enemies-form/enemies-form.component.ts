import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Enemy } from '../enemies.model';
import { EnemyService } from '../enemies.service';

@Component({
  selector: 'app-enemies-form',
  templateUrl: './enemies-form.component.html',
  styleUrls: ['./enemies-form.component.css'],
})
export class EnemiesFormComponent implements OnInit {
  @ViewChild('f') enemyForm!: NgForm;
  origEnemy!: Enemy;
  enemy!: Enemy;
  id!: number;
  subscr!: Subscription;
  editMode: boolean = false;

  constructor(
    private enemyService: EnemyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscr = this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (!this.id) {
        this.editMode = false;
        return;
      }

      this.origEnemy = this.enemyService.getEnemy(this.id);
      if (!this.origEnemy) {
        return;
      }

      this.editMode = true;
      this.enemy = JSON.parse(JSON.stringify(this.origEnemy));
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    console.log('D: ', value);

    let index = this.enemyService.getLength();
    const newEnemy = new Enemy(
      value.id,
      value.enemyId,
      value.imgUrl,
      value.land,
      value.name,
      value.role,
      value.species
    );
    if (this.editMode) {
      this.enemyService.updateEnemy(this.origEnemy, newEnemy);
      this.router.navigate(['/enemies']).then(() => {
        window.location.reload();
      });
    } else {
      this.enemyService.addEnemy(newEnemy);
      this.router.navigate(['/enemies']);
    }
  }

  onCancel() {
    this.router.navigate(['/enemies']);
  }
}
