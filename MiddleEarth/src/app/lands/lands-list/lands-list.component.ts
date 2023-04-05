import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Land } from '../lands.model';
import { LandService } from '../lands.service';

@Component({
  selector: 'app-lands-list',
  templateUrl: './lands-list.component.html',
  styleUrls: ['./lands-list.component.css'],
})
export class LandsListComponent implements OnInit, OnDestroy {
  lands: Land[] = [];
  subscr!: Subscription;

  constructor(private landService: LandService){
    this.landService.getLands();
  }

  ngOnInit() {
    this.landService.getLands();
    this.subscr = this.landService.changedEvent.subscribe((lands: Land[])=>{
      this.lands = lands;
    })
  }

  ngOnDestroy() {
    this.subscr.unsubscribe();
  }
}
