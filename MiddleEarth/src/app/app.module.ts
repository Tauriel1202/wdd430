import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CharsComponent } from './chars/chars.component';
import { EnemiesComponent } from './enemies/enemies.component';
import { LandsComponent } from './lands/lands.component';
import { FormsModule } from '@angular/forms';
import { CharsListComponent } from './chars/chars-list/chars-list.component';
import { CharsDeetsComponent } from './chars/chars-deets/chars-deets.component';
import { CharsFormComponent } from './chars/chars-form/chars-form.component';
import { EnemiesFormComponent } from './enemies/enemies-form/enemies-form.component';
import { EnemiesDeetsComponent } from './enemies/enemies-deets/enemies-deets.component';
import { EnemiesListComponent } from './enemies/enemies-list/enemies-list.component';
import { LandsListComponent } from './lands/lands-list/lands-list.component';
import { LandsFormComponent } from './lands/lands-form/lands-form.component';
import { AppRoutingModule } from './appRouting.module';
import { HeaderComponent } from './header/header.component';
import { CharItemComponent } from './chars/chars-list/char-item/char-item.component';
import { EnemyItemComponent } from './enemies/enemies-list/enemy-item/enemy-item.component';

@NgModule({
  declarations: [
    AppComponent,
    CharsComponent,
    EnemiesComponent,
    LandsComponent,
    CharsListComponent,
    CharsDeetsComponent,
    CharsFormComponent,
    CharItemComponent,
    EnemiesFormComponent,
    EnemiesDeetsComponent,
    EnemyItemComponent,
    EnemiesListComponent,
    HeaderComponent,
    LandsListComponent,
    LandsFormComponent,
  ],
  imports: [AppRoutingModule, BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
