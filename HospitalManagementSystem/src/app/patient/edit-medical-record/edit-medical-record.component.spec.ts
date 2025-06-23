import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMedicalRecordComponent } from './edit-medical-record.component';

describe('EditMedicalRecordComponent', () => {
  let component: EditMedicalRecordComponent;
  let fixture: ComponentFixture<EditMedicalRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMedicalRecordComponent]
    });
    fixture = TestBed.createComponent(EditMedicalRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
