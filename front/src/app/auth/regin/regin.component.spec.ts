import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReginComponent } from './regin.component';

describe('ReginComponent', () => {
  let component: ReginComponent;
  let fixture: ComponentFixture<ReginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
