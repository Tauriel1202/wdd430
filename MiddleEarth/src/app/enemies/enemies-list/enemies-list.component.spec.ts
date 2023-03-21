import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnemiesListComponent } from './enemies-list.component';

describe('EnemiesListComponent', () => {
  let component: EnemiesListComponent;
  let fixture: ComponentFixture<EnemiesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnemiesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnemiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
