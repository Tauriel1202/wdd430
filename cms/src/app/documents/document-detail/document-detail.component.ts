import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';
import { Document } from '../documents.model';
import { docService } from '../documents.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'],
})
export class DocumentDetailComponent implements OnInit {
  document!: Document;
  id!: string;
  nativeWindow: any;

  constructor(
    private docService: docService,
    private route: ActivatedRoute,
    private router: Router,
    private windowRefService: WindRefService
  ) {
    this.nativeWindow = windowRefService.getNativeWindow();
  }

  ngOnInit() {
    console.log(
      'The Elves found the document-detail and are partying On-In-It'
    );
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.document = this.docService.getDocument(this.id);
    });
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.docService.deleteDocument(this.document);
    console.log('The Elves have deleted the selected Document.');
    this.router.navigate(['/documents'], { relativeTo: this.route });
  }
}
