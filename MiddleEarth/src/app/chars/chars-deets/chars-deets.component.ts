import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Char } from '../chars.model';
import { CharService } from '../chars.service';

@Component({
  selector: 'app-chars-deets',
  templateUrl: './chars-deets.component.html',
  styleUrls: ['./chars-deets.component.css'],
})
export class CharsDeetsComponent implements OnInit {
  char!: Char;
  id!: number;
  name!: string;

  constructor(
    private charService: CharService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    console.log(
      'The Elves are in the Char Details, and they are partying On-In-It!'
    );

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.char = this.charService.getChar(this.id);
    });
  }

  onDelete() {
    // this.route.params.subscribe((params: Params) => {
    //   this.id = params['id'];
      
    //   this.charService.deleteChar(this.id);
    //   console.log('The Elves have deleted the selected Char.');
    //   this.router.navigate(['/chars'], { relativeTo: this.route });
    // });
    this.charService.deleteChar(this.char);
    console.log('The Elves have deleted the selected Char.')
    this.router.navigate(['/chars'], {relativeTo: this.route})
  }
}
