import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AppointmentTableComponent } from './appointment-table/appointment-table.component';


@NgModule({
  declarations: [
    AppointmentTableComponent
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    SharedModule
  ]
})
export class AppointmentsModule { }
