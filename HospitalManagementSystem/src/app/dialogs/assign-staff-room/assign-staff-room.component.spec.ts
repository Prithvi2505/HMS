import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignStaffRoomComponent } from './assign-staff-room.component';

describe('AssignStaffRoomComponent', () => {
  let component: AssignStaffRoomComponent;
  let fixture: ComponentFixture<AssignStaffRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignStaffRoomComponent]
    });
    fixture = TestBed.createComponent(AssignStaffRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
