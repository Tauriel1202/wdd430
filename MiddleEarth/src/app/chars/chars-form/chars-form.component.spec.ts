import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharsFormComponent } from './chars-form.component';

describe('CharsFormComponent', () => {
  let component: CharsFormComponent;
  let fixture: ComponentFixture<CharsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
