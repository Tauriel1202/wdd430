import { Component, EventEmitter, Output } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent {
  @Output() selectedContactEvent = new EventEmitter<Contact>();

  contacts: Contact[] = [
    new Contact(
      1,
      'Galadriel Felagund',
      'supercommander@lindonlorien.elf',
      '123-456-7893',
      '../../assets/imgs/galadrielShip.jpg',
      ['Finrod', 'Elrond']
    ),
    new Contact(
      2,
      'Tauriel Greenleaf',
      'captainofmirkwood@silvan.elf',
      '789-564-5557',
      '../../assets/imgs/taurielBow.jpg',
      ['Legolas']
    ),
  ];

  onSelected(contact: Contact) {
    this.selectedContactEvent.emit(contact);
  }
}
