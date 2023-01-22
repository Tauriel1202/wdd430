import { Component } from '@angular/core';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // page starts on docs
  selectedFeature = 'documents';

  // method changes view based on the 
  // received str
  switchView(selectedFeature: string) {
    this.selectedFeature = selectedFeature;
  }
}
