import { EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

export class msgService {
  messageChangedEvent = new EventEmitter<Message[]>();

  public msgs: Message[] = [];

  constructor() {
    this.msgs = MOCKMESSAGES;
  }

  getMessages() {
    return this.msgs.slice();
  }

  getMessage(id: string): Message {
    for (const i of this.msgs) {
      if (i.id == id) {
        return i;
      }
    }
    return null!;
  }

  addMessage(message: Message) {
    this.msgs.push(message);
    this.messageChangedEvent.emit(this.msgs.slice());
    console.log('The Elves are sending a message.');
  }
}
