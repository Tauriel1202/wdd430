import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Char } from '../chars.model';
import { CharService } from '../chars.service';

@Component({
  selector: 'app-chars-deets',
  templateUrl: './chars-deets.component.html',
  styleUrls: ['./chars-deets.component.css'],
})
export class CharsDeetsComponent implements OnInit {
  char!: Char;

  constructor(
    private charService: CharService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(
      'The Elves are in the Char Details, and they are partying On-In-It!'
    );

    
  }
}
