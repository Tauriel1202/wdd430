import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../documents.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(
      1,
      'Recipe Book',
      'an example project with recipes',
      '../../RecipeBook',
      []
    ),
    new Document(
      2,
      'Alvena',
      'a personal writing project',
      'example/url.docx',
      []
    ),
    new Document(
      3,
      'Img testing space',
      'a free space for messing around with imgs and building posters',
      'example/url.pptx',
      []
    ),
    new Document(
      4,
      'Characters',
      'a chart for keeping track of characters',
      'example/url.exe',
      []
    ),
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
