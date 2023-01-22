import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  // sets an event emitter and
  // sends the feature event up to the parent
  @Output() selectedFeatureEvent = new EventEmitter<string>();

  //method emits the selection
  onSelected(selectedEvent: string){
    this.selectedFeatureEvent.emit(selectedEvent)
  }
}
