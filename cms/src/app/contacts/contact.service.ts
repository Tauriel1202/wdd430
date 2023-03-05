import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Contact } from './contact.model';
// import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable()
export class ContactService {
  contactSelectedEvent = new Subject<Contact>();
  contactChangedEvent = new Subject<Contact[]>();
  maxContactId!: number;
  msgSenderEvent = new Subject<Contact>();

  messageSender!: Contact;

  public contacts: Contact[] = [];

  constructor(private http: HttpClient) {
    // this.contacts = MOCKCONTACTS;
    this.getContacts()
    this.maxContactId = this.getMaxId();
  }

  getContacts() {
    // return this.contacts.slice();
    return this.http
      .get<Contact[]>(
        'https://wdd430ccms-3166b-default-rtdb.firebaseio.com/contacts.json'
      )
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = +this.getMaxId();
          this.contacts.sort((a, b) => {
            if (a < b) {
              return -1;
            }
            if (a > b) {
              return 1;
            } else {
              return 0;
            }
          });
          this.contactChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  // getMsgSender(id: string) {
  //   id = JSON.parse(JSON.stringify(id))

  //   return this.http
  //   .get<Contact>(
  //     `https://wdd430ccms-3166b-default-rtdb.firebaseio.com/contacts/${id}/name.json`
  //     )
  //     .subscribe(
  //       (res) => {
  //         // console.log(res);
  //         this.msgSenderEvent.next(res)
  //         return res;
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // }

  getMsgSender(id: string) {
    this.getContacts();

    return this.contacts[+id];
  }

  getContact(id: string) {
    return this.contacts[+id];
  }

  // getContact(id: string): Contact {
  //   for (const contact of this.contacts) {
  //     if (contact.id == id) {
  //       //console.log("found!")
  //       return contact;
  //     }
  //   }
  //   return null!;
  // }

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
    // this.contactChangedEvent.next(contactLstClone);
    this.storeContacts();
  }

  getMaxId() {
    let maxId = 0;

    for (let c in this.contacts) {
      let currentId = +this.contacts[c].id;
      if (currentId > maxId) {
        maxId = currentId;
        // console/.log(maxId, 'Elves Rule!');
      }
    }

    return (maxId += 1);
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }

    this.maxContactId;
    // console.log(this.maxContactId);
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    // let contactLstClone = this.contacts.slice();
    // this.contactChangedEvent.next(contactLstClone);
    this.storeContacts();
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
    // this.contactChangedEvent.next(contactLstClone);
    this.storeContacts();
  }

  storeContacts() {
    this.contacts = JSON.parse(JSON.stringify(this.contacts));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    console.log('Elves are storing the contacts.');

    this.http
      .put<Contact[]>(
        'https://wdd430ccms-3166b-default-rtdb.firebaseio.com/contacts.json',
        this.contacts,
        httpOptions
      )
      .subscribe((response) => {
        console.log(response);
        this.contactChangedEvent.next(this.contacts.slice());
      });
  }
}
