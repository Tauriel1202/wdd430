import { Component } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent {
  contacts: Contact[] = [
    new Contact(
      1,
      'Galadriel Felagund',
      'supercommander@lindonlorien.elf',
      '123-456-7893',
      'https://www.looper.com/img/gallery/galadriels-family-on-the-rings-of-power-explained/intro-1665155261.jpg',
      'null'
    ),
    new Contact(
      2,
      'Tauriel Greenleaf',
      'elfcaptain@mirkwood.elf',
      '456-789-1239',
      'https://upload.wikimedia.org/wikipedia/en/thumb/4/49/EvangelineLillyAsTauriel.jpg/220px-EvangelineLillyAsTauriel.jpg',
      'null'
    ),
  ];
}
