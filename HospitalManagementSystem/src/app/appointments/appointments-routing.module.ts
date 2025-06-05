import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmrntListComponent } from './appointmrnt-list/appointmrnt-list.component';

const routes: Routes = [
  {path:'',component:AppointmrntListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
