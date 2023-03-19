import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from './message.model';
// import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable()
export class msgService {
  messageChangedEvent = new Subject<Message[]>();
  messageChanged = new Subject<Message[]>();
  maxMsgId!: number;

  public msgs: Message[] = [];

  constructor(private http: HttpClient) {
    // this.msgs = MOCKMESSAGES;
    this.maxMsgId = this.getMaxId();
  }

  getMessages() {
    // return this.msgs.slice();
    return this.http
      .get<Message[]>(
        'http://localhost:4200/messages'
        // 'https://wdd430ccms-3166b-default-rtdb.firebaseio.com/messages.json'
      )
      .subscribe(
        (msgs: Message[]) => {
          this.msgs = msgs;
          this.maxMsgId = +this.getMaxId();
          this.msgs.sort((a, b) => {
            if (a < b) {
              return -1;
            }
            if (a > b) {
              return 1;
            } else {
              return 0;
            }
          });
          this.messageChangedEvent.next(this.msgs.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getMessage(id: string): Message {
    for (const i of this.msgs) {
      if (i.id == id) {
        return i;
      }
    }
    return null!;
  }

  getMaxId() {
    let maxId = 0;

    for (let m in this.msgs) {
      let currentId = +this.msgs[m].id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return (maxId += 1);
  }

  // addMessage(message: Message) {
  //   this.maxMsgId;
  //   message.id = this.maxMsgId.toString()
  //   this.msgs.push(message);
  //   // this.messageChangedEvent.emit(this.msgs.slice());
  //   console.log('The Elves are sending a message.');
  //   this.storeMessage()
  // }

  addMessage(newMsg: Message) {
    let docsLstClone;
    if (!newMsg) {
      return;
    }

    newMsg.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: string; msg: Message }>(
        'http://localhost:4200/messages',
        Message,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new document to documents
        this.msgs.push(responseData.msg);
        this.sortAndSend();
      });

    // this.maxDocId++;
    // newDoc.id = this.maxDocId.toString();
    // this.docs.push(newDoc);
    // docsLstClone = this.docs.slice();
    // this.documentChangedEvent.next(docsLstClone);
    // this.storeDocs();
  }

  storeMessage() {
    this.msgs = JSON.parse(JSON.stringify(this.msgs));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    console.log('The Elves are saving messages.');

    this.http
      .put<Message[]>(
        'http://localhost:4200/messages',
        // 'https://wdd430ccms-3166b-default-rtdb.firebaseio.com/messages.json',
        this.msgs,
        httpOptions
      )
      .subscribe((res) => {
        this.messageChangedEvent.next(this.msgs.slice());
      });
  }

  sortAndSend() {
    this.msgs.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });
    this.messageChangedEvent.next(this.msgs.slice());
  }
}
