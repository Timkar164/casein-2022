import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageWorkerComponent } from './page-worker.component';

describe('PageWorkerComponent', () => {
  let component: PageWorkerComponent;
  let fixture: ComponentFixture<PageWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageWorkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
