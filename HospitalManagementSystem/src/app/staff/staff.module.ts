import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffDetailComponent } from './staff-detail/staff-detail.component';


@NgModule({
  declarations: [
    StaffListComponent,
    StaffDetailComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    SharedModule
  ]
})
export class StaffModule { }
