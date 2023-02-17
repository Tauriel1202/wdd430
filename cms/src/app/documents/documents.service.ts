import { Subject, Subscription } from 'rxjs';
import { Document } from './documents.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

export class docService {
  documentSelectedEvent = new Subject<Document>();
  documentChangedEvent = new Subject<Document[]>();
  // docLstChangedEvent = new Subject<Document[]>();
  maxDocId!: number;

  public docs: Document[] = [];

  constructor() {
    this.docs = MOCKDOCUMENTS;
    this.maxDocId = this.getMaxId();
  }

  getDocuments() {
    return this.docs.slice();
  }

  getDocument(id: string) {
    // for (const i of this.docs) {
    //   if (i.id === id) {
    //     return i;
    //   }
    // }
    // return null;
    return this.docs[+id];
  }

  deleteDocument(doc: Document) {
    // if (!document) {
    //   return;
    // }
    // const pos = this.docs.indexOf(document);
    // if (pos < 0) {
    //   return;
    // }
    // this.docs.splice(pos, 1);
    // this.documentChangedEvent.next(this.docs.slice());

    let pos, docLstClone;

    if (!doc) {
      return;
    }

    pos = this.docs.indexOf(doc);
    if (pos < 0) {
      return;
    }

    this.docs.splice(pos, 1);
    docLstClone = this.docs.slice();
    this.documentChangedEvent.next(docLstClone);
  }

  getMaxId() {
    let maxId = 0;
    let currentId = 0;

    for (let d in this.docs) {
      currentId = parseInt(this.docs[d].id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  addDoc(newDoc: Document) {
    let docsLstClone;
    if (!newDoc) {
      return;
    }

    this.maxDocId++;
    newDoc.id = this.maxDocId.toString();
    this.docs.push(newDoc);
    docsLstClone = this.docs.slice();
    this.documentChangedEvent.next(docsLstClone);
  }

  updateDoc(origDoc: Document, newDoc: Document) {
    let pos, docLstClone;

    if (!origDoc || !newDoc) {
      return;
    }

    pos = this.docs.indexOf(origDoc);
    if (pos < 0) {
      return;
    }

    newDoc.id = origDoc.id;
    this.docs[pos] = newDoc;
    docLstClone = this.docs.slice();
    this.documentChangedEvent.next(docLstClone);
  }

  // deleteDoc(doc: Document) {
  //   let pos, docLstClone;

  //   if (!doc) {
  //     return;
  //   }

  //   pos = this.docs.indexOf(doc);
  //   if (pos < 0) {
  //     return;
  //   }

  //   this.docs.splice(pos, 1);
  //   docLstClone = this.docs.slice();
  //   this.documentChangedEvent.next(docLstClone);
  // }
}
