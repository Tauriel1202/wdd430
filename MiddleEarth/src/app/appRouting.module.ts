import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharsDeetsComponent } from './chars/chars-deets/chars-deets.component';
import { CharsFormComponent } from './chars/chars-form/chars-form.component';
import { CharsComponent } from './chars/chars.component';
import { EnemiesDeetsComponent } from './enemies/enemies-deets/enemies-deets.component';
import { EnemiesFormComponent } from './enemies/enemies-form/enemies-form.component';
import { EnemiesComponent } from './enemies/enemies.component';
import { LandsFormComponent } from './lands/lands-form/lands-form.component';
import { LandsComponent } from './lands/lands.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/chars', pathMatch: 'full' },
  {
    path: 'chars',
    component: CharsComponent,
    children: [
      { path: 'new', component: CharsFormComponent },
      { path: ':id', component: CharsDeetsComponent },
      { path: ':id/edit', component: CharsFormComponent },
    ],
  },
  {
    path: 'enemies',
    component: EnemiesComponent,
    children: [
      { path: 'new', component: EnemiesFormComponent },
      { path: ':id', component: EnemiesDeetsComponent },
      { path: ':id/edit', component: EnemiesFormComponent },
    ],
  },
  {
    path: 'lands',
    component: LandsComponent,
    children: [
      { path: 'new', component: LandsFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
