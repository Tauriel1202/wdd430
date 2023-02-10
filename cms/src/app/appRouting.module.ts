import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { DocumentsComponent } from './documents/documents.component';
import { MessageListComponent } from './messages/message-list/message-list.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/documents', pathMatch: 'full' },
  { path: 'contacts', component: ContactsComponent },
  { path: 'documents', component: DocumentsComponent, children: [
    // {path: 'new', component: DocumentEditComponent},
    {path: ':id', component: DocumentDetailComponent},
    // {path: ':id/edit', component: DocumentEditComponent},
  ]},
  { path: 'messages', component: MessageListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
