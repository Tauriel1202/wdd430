import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharsDeetsComponent } from './chars-deets.component';

describe('CharsDeetsComponent', () => {
  let component: CharsDeetsComponent;
  let fixture: ComponentFixture<CharsDeetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharsDeetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharsDeetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
