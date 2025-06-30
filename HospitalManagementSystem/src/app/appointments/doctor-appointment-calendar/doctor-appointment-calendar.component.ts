import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from 'src/app/Model/appointment';

@Component({
  selector: 'app-doctor-appointment-calendar',
  templateUrl: './doctor-appointment-calendar.component.html',
  styleUrls: ['./doctor-appointment-calendar.component.css'],
})
export class DoctorAppointmentCalendarComponent implements OnInit {
  doctorId!: number;
  appointments: Appointment[] = [];
  selectedDate: Date = new Date();
  loading: boolean = true;

  eventSettings = { dataSource: [] as any[] };

  constructor(
    private appointmentService: AppointmentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.doctorId = +id;
        this.loadAppointments();
      }
    });
  }

  loadAppointments(): void {
    this.loading = true;
    this.appointmentService
      .getAppointmentsByDoctorId(this.doctorId)
      .subscribe((data) => {
        this.appointments = data;
        this.mapAppointmentsToEvents();
        this.loading = false;
      });
  }

  mapAppointmentsToEvents(): void {
    this.eventSettings.dataSource = this.appointments.map((app) => {
      const dateStr = app.date; // '2025-06-24'
      const timeStr = app.time as unknown as string; // '10:25:00'

      const startTime = new Date(`${dateStr}T${timeStr}`);
      const endTime = new Date(startTime);
      endTime.setHours(endTime.getHours() + 1);

      const event = {
        Id: app.id,
        Subject: `Appointment #${app.id}`,
        StartTime: startTime,
        EndTime: endTime,
      };
      return event;
    });
  }
}
