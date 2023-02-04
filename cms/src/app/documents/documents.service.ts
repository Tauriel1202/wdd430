import { EventEmitter } from '@angular/core';
import { Document } from './documents.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

export class docService {
  documentSelectedEvent = new EventEmitter<Document>();

  public docs: Document[] = [];

  constructor() {
    this.docs = MOCKDOCUMENTS;
  }

  getDocuments() {
    return this.docs.slice();
  }

  getDocument(id: string) {
    for (const i of this.docs) {
      if (i.id == id) {
        return i;
      }
    }
    return null;
  }
}
