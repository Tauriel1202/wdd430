import { Component, OnInit } from '@angular/core';
import { Char } from './chars.model';
import { CharService } from './chars.service';

@Component({
  selector: 'app-chars',
  templateUrl: './chars.component.html',
  styleUrls: ['./chars.component.css'],
  providers: [CharService],
})
export class CharsComponent implements OnInit {
  selectedChar!: Char;

  constructor(private charService: CharService) {}

  ngOnInit() {
    // this.charService.
    console.log(
      'The Elves found the Char Component and are partying On-In-It!'
    );

    this.charService.selectedEvent.subscribe((char: Char) => {
      this.selectedChar = char;
      console.log('Elves are listening for the list!');
    });
  }
}
