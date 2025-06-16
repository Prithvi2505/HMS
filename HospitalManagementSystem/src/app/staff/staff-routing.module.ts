import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffComponent } from './staff/staff.component';
import { AssignedRoomComponent } from './assigned-room/assigned-room.component';

const routes: Routes = [
  {path:'',component:StaffComponent},
  {path:':id/assigned-rooms', component:AssignedRoomComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
