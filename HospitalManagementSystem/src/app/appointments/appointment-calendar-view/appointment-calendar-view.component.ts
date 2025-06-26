import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/Model/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-appointment-calendar-view',
  templateUrl: './appointment-calendar-view.component.html',
  styleUrls: ['./appointment-calendar-view.component.css']
})
export class AppointmentCalendarViewComponent implements OnInit {
  appointments: Appointment[] = [];
  calendarDays: { label: string, date: string }[] = [];
  timeSlots: string[] = [];

  cellWidth = 150;
  cellHeight = 60;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.generateCalendarDays();
    this.generateTimeSlots();
    this.fetchAppointments();
  }

  generateCalendarDays(): void {
    const today = new Date();
    this.calendarDays = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const label = date.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' });
      const dateStr = date.toISOString().split('T')[0];
      this.calendarDays.push({ label, date: dateStr });
    }
  }

  generateTimeSlots(): void {
    this.timeSlots = [];
    for (let hour = 8; hour <= 20; hour++) {
      const h = hour.toString().padStart(2, '0');
      this.timeSlots.push(`${h}:00:00`);
    }
  }

  fetchAppointments(): void {
    this.appointmentService.getAppointmentsByDoctorId(4).subscribe(data => {
      // Convert time string to Date object for compatibility
      this.appointments = data.map(app => ({
        ...app,
        time: new Date(app.time)
      }));
    });
  }

  getAppointmentStyle(app: Appointment) {
    const timeStr = app.time.toTimeString().substring(0, 8);
    const colIndex = this.timeSlots.indexOf(timeStr);
    const rowIndex = this.calendarDays.findIndex(d => d.date === app.date);

    if (colIndex === -1 || rowIndex === -1) return {};

    return {
      top: `${(rowIndex + 1) * this.cellHeight}px`,
      left: `${(colIndex + 1) * this.cellWidth}px`,
      width: `${this.cellWidth}px`,
      height: `${this.cellHeight - 4}px`
    };
  }

  getAppointmentLabel(app: Appointment): string {
    return `Patient ID: ${app.patientId}`;
  }

  previousWeek() {
    const first = new Date(this.calendarDays[0].date);
    first.setDate(first.getDate() - 7);
    this.calendarDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(first);
      date.setDate(first.getDate() + i);
      const label = date.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' });
      this.calendarDays.push({ label, date: date.toISOString().split('T')[0] });
    }
  }

  nextWeek() {
    const first = new Date(this.calendarDays[0].date);
    first.setDate(first.getDate() + 7);
    this.calendarDays = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(first);
      date.setDate(first.getDate() + i);
      const label = date.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' });
      this.calendarDays.push({ label, date: date.toISOString().split('T')[0] });
    }
  }
}
