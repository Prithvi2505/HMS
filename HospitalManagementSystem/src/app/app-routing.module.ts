import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { authGuard } from './guard/auth.guard';
import { ListPageComponent } from './Components/list-page/list-page.component';
import { DataTableComponent } from './Components/data-table/data-table.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'register',component:RegisterComponent},
  {path:'home',component:HomeComponent, canActivate:[authGuard]},
  {path:'doctor',loadChildren: () => import('./doctor/doctor.module').then( m => m.DoctorModule),canActivate:[authGuard]},
  {path:'patient',loadChildren: () => import('./patient/patient.module').then( m => m.PatientModule),canActivate:[authGuard]},
  {path:'staff',loadChildren:() => import('./staff/staff.module').then(m => m.StaffModule),canActivate:[authGuard]},
  {path:'list/:type', component:ListPageComponent, canActivate:[authGuard]},
  {path:'appointments',component:DataTableComponent ,canActivate:[authGuard]},
  {path:'medical-records',component:DataTableComponent,canActivate:[authGuard]},
  { path: 'rooms', component: DataTableComponent,canActivate:[authGuard] },
  { path: 'bills', component: DataTableComponent,canActivate:[authGuard] },
  { path: 'medical-records/:patientId', component: DataTableComponent,canActivate:[authGuard] },
  { path: 'bills/:patientId', component: DataTableComponent,canActivate:[authGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
