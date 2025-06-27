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
  calendarDates: Date[] = [];
  timeSlots: string[] = [];

  cellWidth = 100;
  cellHeight = 40;

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.generateCalendarDates();
    this.generateTimeSlots();
    this.fetchAppointments();
  }

  generateCalendarDates(): void {
    const today = new Date();
    this.calendarDates = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      this.calendarDates.push(date);
    }
  }

  generateTimeSlots(): void {
  this.timeSlots = [];
  for (let hour = 0; hour < 24; hour++) {
    this.timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    this.timeSlots.push(`${hour.toString().padStart(2, '0')}:30`);
  }
}

  fetchAppointments(): void {
    this.appointmentService.getAppointmentsByDoctorId(12).subscribe((appointments: Appointment[]) => {
      this.appointments = appointments.map(app => {
        const fullDateTimeStr = `${app.date}T${app.time}`;
        const dateTime = new Date(fullDateTimeStr);

        return {
          ...app,
          time: dateTime
        };
      });
    });
  }

getAppointmentStyle(app: Appointment) {
  const appDateStr = new Date(app.date).toLocaleDateString('en-CA');
  const rowIndex = this.calendarDates.findIndex(d =>
    d.toLocaleDateString('en-CA') === appDateStr
  );

  // Round time to nearest half-hour
  const rawDate = app.time;
  const hours = rawDate.getHours();
  const minutes = rawDate.getMinutes();
  const roundedMinutes = minutes < 15 ? 0 : (minutes < 45 ? 30 : 0);
  const roundedHours = minutes >= 45 && hours < 23 ? hours + 1 : hours;
  const roundedTimeStr = `${roundedHours.toString().padStart(2, '0')}:${roundedMinutes.toString().padStart(2, '0')}`;

  const colIndex = this.timeSlots.findIndex(slot => slot === roundedTimeStr);

  if (rowIndex === -1 || colIndex === -1) {
    console.warn(`❌ Could not place appointment:`, {
      date: app.date,
      time: app.time.toLocaleTimeString(),
      roundedTimeStr,
      rowIndex,
      colIndex
    });
    return {};
  }

  return {
    top: `${rowIndex * this.cellHeight + 2}px`,
    left: `${colIndex * this.cellWidth + 122}px`, // adjust 122 to your left label width
    width: `${this.cellWidth - 4}px`,
    height: `${this.cellHeight - 4}px`
  };
}



  getAppointmentLabel(app: Appointment): string {
    return `Patient ID: ${app.patientId}`;
  }

  previousWeek(): void {
    const start = new Date(this.calendarDates[0]);
    start.setDate(start.getDate() - 7);
    this.calendarDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      this.calendarDates.push(date);
    }
  }

  nextWeek(): void {
    const start = new Date(this.calendarDates[0]);
    start.setDate(start.getDate() + 7);
    this.calendarDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      this.calendarDates.push(date);
    }
  }
  isPlottable(app: Appointment): boolean {
  const appDateStr = new Date(app.date).toLocaleDateString('en-CA');
  const rowIndex = this.calendarDates.findIndex(d =>
    d.toLocaleDateString('en-CA') === appDateStr
  );

  const hours = app.time.getHours();
  const minutes = app.time.getMinutes();
  const roundedMinutes = minutes < 15 ? 0 : (minutes < 45 ? 30 : 0);
  const roundedHours = minutes >= 45 && hours < 23 ? hours + 1 : hours;
  const roundedTimeStr = `${roundedHours.toString().padStart(2, '0')}:${roundedMinutes.toString().padStart(2, '0')}`;

  const colIndex = this.timeSlots.findIndex(slot => slot === roundedTimeStr);

  return rowIndex !== -1 && colIndex !== -1;
}

}
