import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Document } from './documents.model';
// import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable()
export class docService {
  documentSelectedEvent = new Subject<Document>();
  documentChangedEvent = new Subject<Document[]>();
  // docLstChangedEvent = new Subject<Document[]>();
  maxDocId!: number;

  public docs: Document[] = [];

  constructor(private http: HttpClient) {
    // this.docs = MOCKDOCUMENTS;
    this.maxDocId = this.getMaxId();
  }

  getDocuments() {
    // return this.docs.slice();
    return this.http
      .get<Document[]>(
        'https://wdd430ccms-3166b-default-rtdb.firebaseio.com/documents.json'
      )
      .subscribe(
        (documents: Document[]) => {
          this.docs = documents;
          this.maxDocId = +this.getMaxId();
          this.docs.sort((a, b) => {
            if (a < b) {
              return -1;
            }
            if (a > b) {
              return 1;
            } else {
              return 0;
            }
          });
          this.documentChangedEvent.next(this.docs.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
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
    // this.documentChangedEvent.next(docLstClone);
    this.storeDocs();
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
    // this.documentChangedEvent.next(docsLstClone);
    this.storeDocs();
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
    // this.documentChangedEvent.next(docLstClone);
    this.storeDocs();
  }

  storeDocs() {
    this.docs = JSON.parse(JSON.stringify(this.docs));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    console.log('The Elves are storing the docs.')

    this.http
      .put<Document[]>(
        'https://wdd430ccms-3166b-default-rtdb.firebaseio.com/documents.json',
        this.docs,
        httpOptions
      )
      .subscribe((response) => {
        console.log(response);
        this.documentChangedEvent.next(this.docs.slice());
      });
  }
}
