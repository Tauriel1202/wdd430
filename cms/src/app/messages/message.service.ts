import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

export class msgService {
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
}
