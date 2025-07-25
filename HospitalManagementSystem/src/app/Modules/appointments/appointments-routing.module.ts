import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentTableComponent } from './appointment-table/appointment-table.component';
import { DoctorAppointmentCalendarComponent } from './doctor-appointment-calendar/doctor-appointment-calendar.component';

const routes: Routes = [
  { path: '', component: AppointmentTableComponent },
  { path: 'doctor/:id', component: AppointmentTableComponent },
  { path: 'calendar/:id', component: DoctorAppointmentCalendarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentsRoutingModule {}
