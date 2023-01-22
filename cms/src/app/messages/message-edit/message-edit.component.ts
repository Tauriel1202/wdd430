import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent {
  // grabs the input elements 
  // sends the msg event with 
  // the MSG type to parent
  @ViewChild('subject') subjectInputRef!: ElementRef;
  @ViewChild('msgText') msgTextInputRef!: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender = 'Courtney';

  // creates a new msg with var values 
  // and emits it
  onSendMessage() {
    const msgSub = this.subjectInputRef.nativeElement.value;
    const txt = this.msgTextInputRef.nativeElement.value;
    const newMsg = new Message(1, msgSub, txt, this.currentSender);
    this.addMessageEvent.emit(newMsg);
  }

  // clears the textboxes
  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }
}
