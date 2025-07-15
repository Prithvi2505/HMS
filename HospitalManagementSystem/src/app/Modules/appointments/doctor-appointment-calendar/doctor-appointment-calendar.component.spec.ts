import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAppointmentCalendarComponent } from './doctor-appointment-calendar.component';

describe('DoctorAppointmentCalendarComponent', () => {
  let component: DoctorAppointmentCalendarComponent;
  let fixture: ComponentFixture<DoctorAppointmentCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorAppointmentCalendarComponent]
    });
    fixture = TestBed.createComponent(DoctorAppointmentCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
