import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AppointmentListComponent
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    SharedModule
  ]
})
export class AppointmentsModule { }
