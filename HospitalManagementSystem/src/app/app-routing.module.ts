import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'register',component:RegisterComponent},
  {path:'home',component:HomeComponent},
  {path:'doctor',loadChildren: () => import('./doctor/doctor.module').then( m => m.DoctorModule)},
  {path:'patient',loadChildren: () => import('./patient/patient.module').then( m => m.PatientModule)},
  {path:'staff',loadChildren:() => import('./staff/staff.module').then(m => m.StaffModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
