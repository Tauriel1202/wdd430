import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { HeaderComponent } from './header.component';
import { ContactItemComponent } from './contacts/contact-list/contact-item/contact-item.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { DocumentItemComponent } from './documents/document-list/document-item/document-item.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { DropdownDirective } from './dropdown.directive';
import { ContactService } from './contacts/contact.service';
import { docService } from './documents/documents.service';
import { msgService } from './messages/message.service';
import { AppRoutingModule } from './appRouting.module';
import { FormsModule } from '@angular/forms';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { DndModule } from 'ng2-dnd';
import { FilterPipe } from './contacts/contacts-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ContactDetailComponent,
    ContactEditComponent,
    ContactItemComponent,
    ContactListComponent,
    DocumentsComponent,
    DocumentDetailComponent,
    DocumentEditComponent,
    DocumentItemComponent,
    DocumentListComponent,
    DropdownDirective,
    FilterPipe,
    HeaderComponent,
    MessagesComponent,
    MessageEditComponent,
    MessageItemComponent,
    MessageListComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    DndModule.forRoot(),
    FormsModule,
    HttpClientModule,
  ],
  providers: [ContactService, docService, msgService],
  bootstrap: [AppComponent],
})
export class AppModule {}
