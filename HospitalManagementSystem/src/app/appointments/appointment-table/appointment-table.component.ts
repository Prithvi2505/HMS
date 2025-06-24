import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AddAppointmentComponent } from 'src/app/appointments/add-appointment/add-appointment.component';
import { EditAppointmentComponent } from 'src/app/appointments/edit-appointment/edit-appointment.component';
import { Appointment } from 'src/app/Model/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { TokenService } from 'src/app/services/token.service';
import { Store } from '@ngrx/store';
import {
  showSuccess,
  showError,
} from 'src/app/Store/snackbar/snackbar.actions';
import { AppointmentFormDialogComponent } from '../appointment-form-dialog/appointment-form-dialog.component';

@Component({
  selector: 'app-appointment-table',
  templateUrl: './appointment-table.component.html',
  styleUrls: ['./appointment-table.component.css'],
})
export class AppointmentTableComponent implements OnInit {
  appointments: Appointment[] = [];
  dataSource: any[] = [];
  displayedColumns: string[] = [];
  columnHeaders: { [key: string]: string } = {};
  user = { userid: 0, role: '' };

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private tokenService: TokenService,
    private store: Store
  ) {}

  ngOnInit() {
    const urlId = Number(this.route.snapshot.paramMap.get('id'));
    this.user.role = this.tokenService.getUserRole()!;
    this.user.userid = this.tokenService.getUserId()!;
    const { userid, role } = this.user;

    const baseColumns = ['id', 'patientId', 'doctorId', 'date', 'time'];
    const actionColumns = ['action', 'remove'];

    this.displayedColumns = baseColumns;
    if (
      this.user.role === 'patient' ||
      (this.user.role === 'doctor' && urlId == this.user.userid)
    ) {
      this.displayedColumns = [...baseColumns, ...actionColumns];
    }
    this.columnHeaders = {
      id: 'ID',
      patientId: 'Patient ID',
      doctorId: 'Doctor ID',
      date: 'Date',
      time: 'Time',
      action: 'Action',
      remove: 'Remove',
    };

    this.route.paramMap.subscribe((params) => {
      const doctorId = params.get('id');
      if (this.user.role === 'doctor' && doctorId) {
        this.loadDoctorAppointments(+doctorId);
      } else {
        this.loadAllAppointments();
      }
    });
  }

  addAppointment() {
    const dialogRef = this.dialog.open(AppointmentFormDialogComponent, {
      width: '500px',
      data: { mode: 'add' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.route.paramMap.subscribe((params) => {
          const doctorId = params.get('id');
          if (this.user.role === 'doctor' && doctorId) {
            this.loadDoctorAppointments(+doctorId);
          } else {
            this.loadAllAppointments();
          }
        });
      }
    });
  }

  loadAllAppointments() {
    this.appointmentService.getAllAppointments().subscribe((data) => {
      this.appointments = data.map((app) => ({
        ...app,
        time: new Date(`1970-01-01T${app.time}`),
      }));
      this.dataSource = this.appointments;
    });
  }

  loadDoctorAppointments(id: number) {
    this.appointmentService.getAppointmentsByDoctorId(id).subscribe((data) => {
      this.appointments = data.map((app) => ({
        ...app,
        time: new Date(`1970-01-01T${app.time}`),
      }));
      this.dataSource = this.appointments;
    });
  }

  loadPatientAppointments(id: number) {
    this.appointmentService.getAppointmentsByPatientId(id).subscribe((data) => {
      this.appointments = data.map((app) => ({
        ...app,
        time: new Date(`1970-01-01T${app.time}`),
      }));
      this.dataSource = this.appointments;
    });
  }

  onUpdate(item: any) {
    const dialogRef = this.dialog.open(AppointmentFormDialogComponent, {
      width: '400px',
      data: {
        mode: 'edit',
        initialValues: item,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.route.paramMap.subscribe((params) => {
          const doctorId = params.get('id');
          if (this.user.role === 'doctor' && doctorId) {
            this.loadDoctorAppointments(+doctorId);
          } else {
            this.loadAllAppointments();
          }
        });
      }
    });
  }
  onDelete(item: any) {
    const confirmDelete = confirm(
      `Are you sure you want to delete appointment ID ${item.id}?`
    );
    if (!confirmDelete) return;

    this.appointmentService.deleteAppointment(item.id).subscribe({
      next: () => {
        this.store.dispatch(
          showSuccess({ message: 'Appointment deleted successfully!' })
        );
        const doctorId = this.route.snapshot.paramMap.get('id');
        if (this.user.role === 'doctor' && doctorId) {
          this.loadDoctorAppointments(+doctorId);
        } else {
          this.loadAllAppointments();
        }
      },
      error: (err) => {
        console.error('Failed to delete appointment:', err);
        this.store.dispatch(
          showError({
            message: err.error?.message || 'Failed to delete appointment.',
          })
        );
      },
    });
  }
}
