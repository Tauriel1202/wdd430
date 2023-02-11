import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../documents.model';
import { docService } from '../documents.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [];

  constructor(private docService: docService) {
    this.documents = this.docService.getDocuments();
  }

  ngOnInit() {
    this.docService.documentChangedEvent.subscribe((documents: Document[]) => {
      this.documents = documents;
    });
  }
}
