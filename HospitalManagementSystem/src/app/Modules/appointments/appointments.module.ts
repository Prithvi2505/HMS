import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppointmentTableComponent } from './appointment-table/appointment-table.component';
import { AppointmentFormDialogComponent } from './appointment-form-dialog/appointment-form-dialog.component';
import { DoctorAppointmentCalendarComponent } from './doctor-appointment-calendar/doctor-appointment-calendar.component';
import {
  ScheduleModule,
  RecurrenceEditorModule,
} from '@syncfusion/ej2-angular-schedule';
import {
  WeekService,
  DayService,
  WorkWeekService,
  MonthService,
  AgendaService,
} from '@syncfusion/ej2-angular-schedule';

@NgModule({
  declarations: [
    AppointmentTableComponent,
    AppointmentFormDialogComponent,
    DoctorAppointmentCalendarComponent,
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    SharedModule,
    ScheduleModule,
    RecurrenceEditorModule,
  ],
  providers: [
    WeekService,
    DayService,
    WorkWeekService,
    MonthService,
    AgendaService,
  ],
})
export class AppointmentsModule {}
