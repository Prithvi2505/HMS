import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './Store/auth.reducer';
import { ListPageComponent } from './Components/list-page/list-page.component';
import { DataTableComponent } from './Components/data-table/data-table.component';
import { AddAppointmentComponent } from './dialogs/add-appointment/add-appointment.component';
import { AddBillComponent } from './dialogs/add-bill/add-bill.component';
import { AssignStaffRoomComponent } from './dialogs/assign-staff-room/assign-staff-room.component';
import { AddMedicalRecordComponent } from './dialogs/add-medical-record/add-medical-record.component';
import { BillTableComponent } from './Components/bill-table/bill-table.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { EditUserComponent } from './dialogs/edit-user/edit-user.component';
import { doctorReducer } from './Store/doctor/doctor.reducer';
import { patientReducer } from './Store/patient/patient.reducer';
import { staffReducer } from './Store/staff/staff.reducer';
import { PatientEffects } from './Store/patient/patient.effects';
import { StaffEffects } from './Store/staff/staff.effects';
import { DoctorEffects } from './Store/doctor/doctor.effects';
import { RoomTableComponent } from './Components/room-table/room-table.component';
import { AddRoomComponent } from './dialogs/add-room/add-room.component';
import { EditRoomComponent } from './dialogs/edit-room/edit-room.component';
import { EditMedicalRecordComponent } from './dialogs/edit-medical-record/edit-medical-record.component';
import { EditAppointmentComponent } from './dialogs/edit-appointment/edit-appointment.component';
import { EditBillComponent } from './dialogs/edit-bill/edit-bill.component';
import { snackbarReducer } from './Store/snackbar/snackbar.reducer';
import { SnackbarEffects } from './Store/snackbar/snackbar.effects';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ListPageComponent,
    DataTableComponent,
    AddAppointmentComponent,
    AddBillComponent,
    AssignStaffRoomComponent,
    AddMedicalRecordComponent,
    BillTableComponent,
    EditUserComponent,
    RoomTableComponent,
    AddRoomComponent,
    EditRoomComponent,
    EditMedicalRecordComponent,
    EditAppointmentComponent,
    EditBillComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forRoot({auth: authReducer,
      patients: patientReducer,
      doctors: doctorReducer,
      staff: staffReducer,snackbar: snackbarReducer}),
    EffectsModule.forRoot([DoctorEffects,
  StaffEffects,
  PatientEffects,
  SnackbarEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
