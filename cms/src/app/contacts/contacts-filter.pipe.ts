import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(contacts: Contact[], term: string): any {
    let filterArray: Contact[] = [];

    //for looped
    for (let i = 0; i < contacts.length; i++) {
      let contact = contacts[i];
      if (contact.name.toLowerCase().includes(term)) {
        filterArray.push(contact);
      }
    }

    //using filter
    // if (term && term.length > 0) {
    //   filterArray = contacts.filter((contact: Contact) => {
    //     contact.name.toLowerCase().includes(term.toLowerCase());
    //     console.log(filterArray)
    //   });
    // }

    if (filterArray.length < 1) {
      return contacts;
    }

    return filterArray;
  }
}
