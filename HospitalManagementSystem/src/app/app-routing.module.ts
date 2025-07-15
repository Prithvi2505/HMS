import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Modules/shared/home/home.component'; 
import { LoginComponent } from './Modules/shared/login/login.component'; 
import { RegisterComponent } from './Modules/shared/register/register.component'; 
import { authGuard } from './guard/auth.guard';
import { BillTableComponent } from './Modules/shared/bill-table/bill-table.component'; 
import { RoomTableComponent } from './Modules/shared/room-table/room-table.component'; 

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'register',component:RegisterComponent},
  {path:'home',component:HomeComponent, canActivate:[authGuard]},
  {path:'doctor',loadChildren: () => import('./Modules/doctor/doctor.module').then( m => m.DoctorModule),canActivate:[authGuard]},
  {path:'patient',loadChildren: () => import('./Modules/patient/patient.module').then( m => m.PatientModule),canActivate:[authGuard]},
  {path:'staff',loadChildren:() => import('./Modules/staff/staff.module').then(m => m.StaffModule),canActivate:[authGuard]},
  {path:'appointments',loadChildren:() => import('./Modules/appointments/appointments.module').then(m => m.AppointmentsModule) ,canActivate:[authGuard]},
  { path: 'rooms', component: RoomTableComponent,canActivate:[authGuard] },
  { path: 'bills', component: BillTableComponent,canActivate:[authGuard] },
  {path:'bills/patient/:id',component:BillTableComponent,canActivate:[authGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
