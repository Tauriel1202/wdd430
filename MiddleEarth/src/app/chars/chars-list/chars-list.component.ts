import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Char } from '../chars.model';
import { CharService } from '../chars.service';

@Component({
  selector: 'app-chars-list',
  templateUrl: './chars-list.component.html',
  styleUrls: ['./chars-list.component.css'],
})
export class CharsListComponent implements OnInit, OnDestroy {
  chars: Char[] = [];
  subscr!: Subscription;
  // if search is implemented: term: string;

  constructor(private charService: CharService) {
    this.charService.getChars();
  }

  ngOnInit() {
    this.charService.getChars();
    this.subscr = this.charService.changedEvent.subscribe((chars: Char[]) => {
      this.chars = chars;
    });
  }

  // if search implemented
  // search(value: string){
  // this.term = value;
  // }

  ngOnDestroy() {
    this.subscr.unsubscribe();
  }
}
