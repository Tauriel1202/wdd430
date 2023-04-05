import { Component, OnInit } from '@angular/core';
import { LandService } from './lands.service';

@Component({
  selector: 'app-lands',
  templateUrl: './lands.component.html',
  styleUrls: ['./lands.component.css'],
  providers: [LandService],
})
export class LandsComponent implements OnInit {
  ngOnInit() {
    console.log('The Elves are charting the Lands Component!');
  }
}
