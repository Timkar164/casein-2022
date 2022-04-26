import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionControlComponent } from './execution-control.component';

describe('ExecutionControlComponent', () => {
  let component: ExecutionControlComponent;
  let fixture: ComponentFixture<ExecutionControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecutionControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecutionControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
