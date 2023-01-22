import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent {
  // list of msgs to display
  messages: Message[] = [
    new Message(
      1,
      'Pickup from Store',
      'Grab pb, pie crust, and cream cheese',
      "Aldmond"
    ),
    new Message(2, 'Quest paths', 'desert, dungeon, snow', 'Maethoriel'),
    new Message(3, 'Elf Warriors', 'Galadriel, Tauriel, Legolas, Elrond', "ElfLover"),
    new Message(4, 'Dungeon Guards', 'Bric, Evet, Torg', 'Galawyn')
  ];

  // method adds new msgs to the lst
  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
