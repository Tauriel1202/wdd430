import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { msgService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  // list of msgs to display
  messages: Message[] = [];

  constructor(private msgService: msgService) {}

  ngOnInit() {
    this.messages = this.msgService.getMessages();
  }

  // method adds new msgs to the lst
  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
