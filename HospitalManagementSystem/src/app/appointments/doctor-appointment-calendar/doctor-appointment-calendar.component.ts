import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from 'src/app/Model/appointment';

@Component({
  selector: 'app-doctor-appointment-calendar',
  templateUrl: './doctor-appointment-calendar.component.html',
  styleUrls: ['./doctor-appointment-calendar.component.css']
})
export class DoctorAppointmentCalendarComponent implements OnInit {

  doctorId!: number;
  timeSlots: string[] = [];
  weekDates: string[] = [];
  appointments: Appointment[] = [];

  constructor(
    private appointmentService: AppointmentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.timeSlots = this.generateTimeSlots('00:00', '23:00'); // full-day view
    this.weekDates = this.getCurrentWeekDates();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.doctorId = +id;
        this.loadAppointments();
      }
    });
  }

  loadAppointments(): void {
    this.appointmentService.getAppointmentsByDoctorId(this.doctorId).subscribe(data => {
      this.appointments = data;
    });
  }

  generateTimeSlots(start: string, end: string): string[] {
    const slots: string[] = [];
    let [hour] = start.split(':').map(Number);
    const [endHour] = end.split(':').map(Number);

    while (hour <= endHour) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      hour++;
    }

    return slots;
  }

  getCurrentWeekDates(): string[] {
    const today = new Date();
    const monday = new Date(today.setDate(today.getDate() - ((today.getDay() + 6) % 7)));
    const week: string[] = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      week.push(d.toISOString().split('T')[0]);
    }

    return week;
  }

  formatTime(date: Date): string {
    const d = new Date(date);
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  }

  getAppointment(date: string, time: string): Appointment | null {
  return this.appointments.find(app => {
    const appTime = new Date(app.time); // ensure valid Date object
    const formatted = `${appTime.getHours().toString().padStart(2, '0')}:${appTime.getMinutes().toString().padStart(2, '0')}`;
    return app.date === date && formatted === time;
  }) || null;
}

}
