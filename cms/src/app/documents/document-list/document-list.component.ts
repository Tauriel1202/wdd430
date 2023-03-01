import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from '../documents.model';
import { docService } from '../documents.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit, OnDestroy {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  subscription!: Subscription;

  documents: Document[] = [];

  constructor(private docService: docService) {
    // this.documents = this.docService.getDocuments();
    this.docService.getDocuments();
  }

  ngOnInit() {
    this.subscription = this.docService.documentChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
