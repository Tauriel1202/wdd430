import { Component, ViewChild } from '@angular/core';
import { LandService } from '../lands.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Land } from '../lands.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lands-form',
  templateUrl: './lands-form.component.html',
  styleUrls: ['./lands-form.component.css'],
})
export class LandsFormComponent {
  @ViewChild('f') landForm!: NgForm;
  land!: Land;
  subscr!: Subscription;

  constructor(private landService: LandService, private router: Router) {}

  onSubmit(form: NgForm) {
    const value = form.value;
    const newLand = new Land(value.id, value.landId, value.name, value.imgUrl);
    this.landService.addLand(newLand);
    this.router.navigate(['/lands'])
    form.resetForm();
  }

  onCancel() {
    this.router.navigate(['/lands']);
    this.landForm.resetForm();
  }
}
