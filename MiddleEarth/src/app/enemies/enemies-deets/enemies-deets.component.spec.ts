import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnemiesDeetsComponent } from './enemies-deets.component';

describe('EnemiesDeetsComponent', () => {
  let component: EnemiesDeetsComponent;
  let fixture: ComponentFixture<EnemiesDeetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnemiesDeetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnemiesDeetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
