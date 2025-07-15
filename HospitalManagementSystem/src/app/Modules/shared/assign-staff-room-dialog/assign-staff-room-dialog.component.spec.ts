import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignStaffRoomDialogComponent } from './assign-staff-room-dialog.component';

describe('AssignStaffRoomDialogComponent', () => {
  let component: AssignStaffRoomDialogComponent;
  let fixture: ComponentFixture<AssignStaffRoomDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignStaffRoomDialogComponent]
    });
    fixture = TestBed.createComponent(AssignStaffRoomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
