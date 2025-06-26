import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentCalendarViewComponent } from './appointment-calendar-view.component';

describe('AppointmentCalendarViewComponent', () => {
  let component: AppointmentCalendarViewComponent;
  let fixture: ComponentFixture<AppointmentCalendarViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentCalendarViewComponent]
    });
    fixture = TestBed.createComponent(AppointmentCalendarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
