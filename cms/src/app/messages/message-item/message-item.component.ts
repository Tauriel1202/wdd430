import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
})
export class MessageItemComponent implements OnInit {
  @Input() message!: Message;
  messageSender!: string;

  @Output() messageSelected = new EventEmitter<void>();

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    const contact = this.contactService.getContact(this.message.sender);
    this.messageSender = contact.name;
  }

  onSelected() {
    this.messageSelected.emit();
  }
}
