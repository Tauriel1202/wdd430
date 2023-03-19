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
    this.getContacts();
    this.maxContactId = this.getMaxId();
  }

  getContacts() {
    // return this.contacts.slice();
    return this.http
      .get<Contact[]>(
        '/contacts'
        // 'https://wdd430ccms-3166b-default-rtdb.firebaseio.com/contacts.json'
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

  // deleteContact(contact: Contact) {
  //   //   if (!contact) {
  //   //     return;
  //   //   }
  //   //   const pos = this.contacts.indexOf(contact);
  //   //   if (pos < 0) {
  //   //     return;
  //   //   }
  //   //   this.contacts.splice(pos, 1);
  //   //   this.contactChangedEvent.emit(this.contacts.slice());

  //   let pos, contactLstClone;

  //   if (!contact) {
  //     return;
  //   }

  //   pos = this.contacts.indexOf(contact);
  //   if (pos < 0) {
  //     return;
  //   }

  //   this.contacts.splice(pos, 1);
  //   contactLstClone = this.contacts.slice();
  //   // this.contactChangedEvent.next(contactLstClone);
  //   this.storeContacts();
  // }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex((c) => c.id === contact.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http
      .delete('http://localhost:4200/contacts' + contact.id)
      .subscribe((res) => {
        console.log(res);
        this.contacts.splice(pos, 1);
        this.sortAndSend();
      });
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
    let docsLstClone;
    if (!newContact) {
      return;
    }

    newContact.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: string; contact: Contact }>(
        'http://localhost:4200/contacts',
        Contact,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new document to documents
        this.contacts.push(responseData.contact);
        this.sortAndSend();
      });

    // this.maxDocId++;
    // newDoc.id = this.maxDocId.toString();
    // this.docs.push(newDoc);
    // docsLstClone = this.docs.slice();
    // this.documentChangedEvent.next(docsLstClone);
    // this.storeDocs();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex((d) => d.id === originalContact.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Contact to the id of the old Contact
    newContact.id = originalContact.id;
    // newContact._id = originalContact._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put('http://localhost:4200/contacts' + originalContact.id, newContact, {
        headers: headers,
      })
      .subscribe((response) => {
        console.log(`👍 ${response}`);
        this.contacts[pos] = newContact;
        this.sortAndSend();
      });
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
        'http://localhost:4200/contacts',
        // 'https://wdd430ccms-3166b-default-rtdb.firebaseio.com/contacts.json',
        this.contacts,
        httpOptions
      )
      .subscribe((response) => {
        console.log(response);
        this.contactChangedEvent.next(this.contacts.slice());
      });
  }

  sortAndSend() {
    this.contacts.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    this.contactChangedEvent.next(this.contacts.slice());
  }
}
