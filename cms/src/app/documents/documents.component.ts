import { Component } from '@angular/core';
import { Document } from './documents.model';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
})
export class DocumentsComponent {
  selectedDocument!: Document;
 
}
