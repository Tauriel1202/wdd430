import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
})
export class MessageItemComponent implements OnInit, OnDestroy {
  @Input() message!: Message;
  // messageSender!: {};

  //test msg fix
  messageSender!: string;
  subscr!: Subscription;
  //

  @Output() messageSelected = new EventEmitter<void>();

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    let contact: Contact = this.contactService.getContact(this.message.sender);
    if (!contact?.name) {
      this.messageSender = 'Loading...';
    } else {
      this.messageSender = contact.name;
    }
    this.subscr = this.contactService.contactChangedEvent.subscribe(() => {
      contact = this.contactService.getContact(this.message.sender);
      this.messageSender = contact.name;
    });
  }

  onSelected() {
    this.messageSelected.emit();
  }

  ngOnDestroy(){
    // this.contactService.msgSenderEvent.unsubscribe()
    this.subscr.unsubscribe()
  }
}
