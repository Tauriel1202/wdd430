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

  constructor(private docService: docService) {}

  ngOnInit() {
    this.documents = this.docService.getDocuments();
  }

  onSelectedDocument(document: Document) {
    this.docService.documentSelectedEvent.emit(document);
    console.log('The Elves are sending docs.')
  }
}
