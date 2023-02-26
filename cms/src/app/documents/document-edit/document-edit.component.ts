import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Document } from '../documents.model';
import { docService } from '../documents.service';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css'],
})
export class DocumentEditComponent implements OnInit {
  @ViewChild('f') docForm!: NgForm;
  originalDocument!: Document;
  document!: Document;
  editMode: boolean = false;
  subscr!: Subscription;
  id!: string;

  constructor(
    private docService: docService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscr = this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (!this.id) {
        this.editMode = false;
        return;
      }

      this.originalDocument = this.docService.getDocument(this.id);

      if (!this.originalDocument) {
        return;
      }

      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newDoc = new Document(
      value.id,
      value.name,
      value.descr,
      value.url,
      value.children
    );
    if (this.editMode) {
      this.docService.updateDoc(this.originalDocument, newDoc);
    } else {
      this.docService.addDoc(newDoc);
    }
    this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }
}
