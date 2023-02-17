import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable()
export class ContactService {
  contactSelectedEvent = new Subject<Contact>();
  contactChangedEvent = new Subject<Contact[]>();
  maxContactId!: number;

  public contacts: Contact[] = [];

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts() {
    return this.contacts.slice();
  }

  getContact(id: string) {
    for (const i of this.contacts) {
      if (i.id == id) {
        console.log(i);
        return i;
      }
    }

    // return null!;
    // }
    return this.contacts[+id];
  }

  deleteContact(contact: Contact) {
    //   if (!contact) {
    //     return;
    //   }
    //   const pos = this.contacts.indexOf(contact);
    //   if (pos < 0) {
    //     return;
    //   }
    //   this.contacts.splice(pos, 1);
    //   this.contactChangedEvent.emit(this.contacts.slice());

    let pos, contactLstClone;

    if (!contact) {
      return;
    }

    pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    contactLstClone = this.contacts.slice();
    this.contactChangedEvent.next(contactLstClone);
  }

  getMaxId() {
    let maxId = 0;

    for (let c in this.contacts) {
      let currentId = +this.contacts[c].id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }

    this.maxContactId;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    let contactLstClone = this.contacts.slice();
    this.contactChangedEvent.next(contactLstClone);
  }

  updateContact(origContact: Contact, newContact: Contact) {
    if (!origContact || !newContact) {
      return;
    }

    let pos = this.contacts.indexOf(origContact);
    if (pos < 0) {
      return;
    }

    newContact.id = origContact.id;
    this.contacts[pos] = newContact;
    let contactLstClone = this.contacts.slice();
    this.contactChangedEvent.next(contactLstClone);
  }
}
