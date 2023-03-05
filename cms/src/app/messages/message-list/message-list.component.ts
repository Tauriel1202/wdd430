import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from '../message.model';
import { msgService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit, OnDestroy {
  // list of msgs to display
  messages: Message[] = [];
  subscr!: Subscription;

  constructor(public msgService: msgService) {
    this.msgService.getMessages();
  }

  ngOnInit() {
    this.subscr = this.msgService.messageChanged.subscribe(
      (msgs: Message[]) => {
        this.messages = msgs;
      }
    );
    
    // this.messages = this.msgService.getMessages();
    this.subscr = this.msgService.messageChangedEvent.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );

    
  }

  // method adds new msgs to the lst
  onAddMessage(message: Message) {
    this.messages.push(message);
  }

  ngOnDestroy() {
    this.subscr.unsubscribe();
  }
}
