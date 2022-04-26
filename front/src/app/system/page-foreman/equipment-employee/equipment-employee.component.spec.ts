import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentEmployeeComponent } from './equipment-employee.component';

describe('EquipmentEmployeeComponent', () => {
  let component: EquipmentEmployeeComponent;
  let fixture: ComponentFixture<EquipmentEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
