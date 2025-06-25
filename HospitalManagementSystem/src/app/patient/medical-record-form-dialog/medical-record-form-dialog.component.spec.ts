import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalRecordFormDialogComponent } from './medical-record-form-dialog.component';

describe('MedicalRecordFormDialogComponent', () => {
  let component: MedicalRecordFormDialogComponent;
  let fixture: ComponentFixture<MedicalRecordFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalRecordFormDialogComponent]
    });
    fixture = TestBed.createComponent(MedicalRecordFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
