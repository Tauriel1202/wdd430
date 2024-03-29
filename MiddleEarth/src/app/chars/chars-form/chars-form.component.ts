import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Char } from '../chars.model';
import { CharService } from '../chars.service';

@Component({
  selector: 'app-chars-form',
  templateUrl: './chars-form.component.html',
  styleUrls: ['./chars-form.component.css'],
})
export class CharsFormComponent implements OnInit {
  @ViewChild('f') charForm!: NgForm;
  origChar!: Char;
  char!: Char;
  id!: number;
  subscr!: Subscription;
  editMode: boolean = false;

  constructor(
    private charService: CharService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscr = this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (!this.id) {
        this.editMode = false;
        return;
      }

      this.origChar = this.charService.getChar(this.id);
      if (!this.origChar) {
        return;
      }

      this.editMode = true;
      this.char = JSON.parse(JSON.stringify(this.origChar));
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    console.log('D: ', value);

    let index = this.charService.getLength();
    const newChar = new Char(
      value.id,
      value.charId,
      value.imgUrl,
      value.land,
      value.name,
      value.role,
      value.species
    );
    if (this.editMode) {
      this.charService.updateChar(this.origChar, newChar);
      this.router.navigate(['/chars']).then(() => {
        window.location.reload();
      });
    } else {
      this.charService.addChar(newChar);
      this.router.navigate(['/chars']);
    }
  }

  onCancel() {
    this.router.navigate(['/chars']);
  }

  isInvalidChar(newChar: Char) {
    if (!newChar) {
      return true;
    }
    if (this.char && newChar.id === this.char.id) {
      return true;
    }
    // for (let i = 0; i< this.family.length; i++){
    //   if (newChar.id === this.family[i].id){
    //     return true;
    //   }
    // }
    return false;
  }
}
