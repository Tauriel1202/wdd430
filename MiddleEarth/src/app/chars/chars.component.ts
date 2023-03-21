import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chars',
  templateUrl: './chars.component.html',
  styleUrls: ['./chars.component.css'],
})
export class CharsComponent implements OnInit {
  // selectedChar: CharsComponent;

  // constructor(private charService: CharService) {}

  ngOnInit() {
    // this.charService.
    console.log(
      'The Elves found the Char Component and are partying On-In-It!'
    );
  }
}
