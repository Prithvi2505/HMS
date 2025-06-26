import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AppointmentTableComponent } from './appointment-table/appointment-table.component';
import { AppointmentFormDialogComponent } from './appointment-form-dialog/appointment-form-dialog.component';


@NgModule({
  declarations: [
    AppointmentTableComponent,
    AppointmentFormDialogComponent,
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    SharedModule
  ]
})
export class AppointmentsModule { }
