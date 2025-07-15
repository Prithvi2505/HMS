import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StaffComponent } from './staff/staff.component';
import { AssignedRoomComponent } from './assigned-room/assigned-room.component';


@NgModule({
  declarations: [
  
    StaffComponent,
       AssignedRoomComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    SharedModule
  ]
})
export class StaffModule { }
