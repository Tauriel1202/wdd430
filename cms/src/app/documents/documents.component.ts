import { Component, OnInit } from '@angular/core';
import { Document } from './documents.model';
import { docService } from './documents.service';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  providers: [docService],
})
export class DocumentsComponent implements OnInit {
  selectedDocument!: Document;

  constructor(private docService: docService) {}

  ngOnInit() {
    this.docService.documentSelectedEvent.subscribe((document: Document) => {
      this.selectedDocument = document;
      console.log('The Elves are waiting for the docs.');
    });
  }
}
