import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable()
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();

  public contacts: Contact[] = [];

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts() {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    for (const i of this.contacts) {
      if (i.id == id) {
        return i;
      }
    }

    return null!;
  }
}
