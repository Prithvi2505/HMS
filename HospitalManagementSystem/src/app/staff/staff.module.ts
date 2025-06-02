import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StaffListComponent } from './staff-list/staff-list.component';
import { NewStaffComponent } from './new-staff/new-staff.component';


@NgModule({
  declarations: [
    StaffListComponent,
    NewStaffComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    SharedModule
  ]
})
export class StaffModule { }
