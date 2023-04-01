import { Component, OnInit } from '@angular/core';
import { Enemy } from '../enemies.model';
import { EnemyService } from '../enemies.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-enemies-deets',
  templateUrl: './enemies-deets.component.html',
  styleUrls: ['./enemies-deets.component.css'],
})
export class EnemiesDeetsComponent implements OnInit {
  enemy!: Enemy;
  id!: number;
  name!: string;

  constructor(
    private enemyService: EnemyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('The Elves are reading the secret intel from the enemy!');

    this.route.params.subscribe((params: Params)=>{
      this.id = params['id'];
      this.enemy = this.enemyService.getEnemy(this.id);
    });
  }

  onDelete(){
    this.route.data.subscribe((params: Params)=>{
      this.id = params['enemyId']
      console.log('EnemyId: ', this.id);

      this.enemyService.deleteEnemy(this.enemy)
      console.log('The Elves defeated an enemy!');
      this.router.navigate(['/enemies'], {relativeTo: this.route}).then(()=>{
        window.location.reload()
      })
    })
  }
}
