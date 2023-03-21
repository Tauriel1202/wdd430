import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharsListComponent } from './chars-list.component';

describe('CharsListComponent', () => {
  let component: CharsListComponent;
  let fixture: ComponentFixture<CharsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
