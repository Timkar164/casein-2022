import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectdetectionComponent } from './objectdetection.component';

describe('ObjectdetectionComponent', () => {
  let component: ObjectdetectionComponent;
  let fixture: ComponentFixture<ObjectdetectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectdetectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectdetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
