import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicalRecordComponent } from './add-medical-record.component';

describe('AddMedicalRecordComponent', () => {
  let component: AddMedicalRecordComponent;
  let fixture: ComponentFixture<AddMedicalRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMedicalRecordComponent]
    });
    fixture = TestBed.createComponent(AddMedicalRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
