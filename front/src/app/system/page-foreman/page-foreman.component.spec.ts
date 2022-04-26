import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageForemanComponent } from './page-foreman.component';

describe('PageForemanComponent', () => {
  let component: PageForemanComponent;
  let fixture: ComponentFixture<PageForemanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageForemanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageForemanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
