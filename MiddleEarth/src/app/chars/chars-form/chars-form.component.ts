import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-chars-form',
  templateUrl: './chars-form.component.html',
  styleUrls: ['./chars-form.component.css'],
})
export class CharsFormComponent {
  onSubmit(form: NgForm) {}
}
