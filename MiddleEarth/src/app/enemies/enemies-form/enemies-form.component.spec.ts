import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnemiesFormComponent } from './enemies-form.component';

describe('EnemiesFormComponent', () => {
  let component: EnemiesFormComponent;
  let fixture: ComponentFixture<EnemiesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnemiesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnemiesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
