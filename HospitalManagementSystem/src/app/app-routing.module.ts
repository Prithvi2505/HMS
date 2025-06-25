import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
import { authGuard } from './guard/auth.guard';
import { BillTableComponent } from './shared/bill-table/bill-table.component';
import { RoomTableComponent } from './shared/room-table/room-table.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'register',component:RegisterComponent},
  {path:'home',component:HomeComponent, canActivate:[authGuard]},
  {path:'doctor',loadChildren: () => import('./doctor/doctor.module').then( m => m.DoctorModule),canActivate:[authGuard]},
  {path:'patient',loadChildren: () => import('./patient/patient.module').then( m => m.PatientModule),canActivate:[authGuard]},
  {path:'staff',loadChildren:() => import('./staff/staff.module').then(m => m.StaffModule),canActivate:[authGuard]},
  {path:'appointments',loadChildren:() => import('./appointments/appointments.module').then(m => m.AppointmentsModule) ,canActivate:[authGuard]},
  { path: 'rooms', component: RoomTableComponent,canActivate:[authGuard] },
  { path: 'bills', component: BillTableComponent,canActivate:[authGuard] },
  {path:'bills/patient/:id',component:BillTableComponent,canActivate:[authGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
