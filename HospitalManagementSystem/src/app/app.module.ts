import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './Modules/shared/shared.module'; 
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './Ngrx/auth.reducer';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { doctorReducer } from './Ngrx/doctor/doctor.reducer';
import { patientReducer } from './Ngrx/patient/patient.reducer';
import { staffReducer } from './Ngrx/staff/staff.reducer';
import { PatientEffects } from './Ngrx/patient/patient.effects';
import { StaffEffects } from './Ngrx/staff/staff.effects';
import { DoctorEffects } from './Ngrx/doctor/doctor.effects';
import { snackbarReducer } from './Ngrx/snackbar/snackbar.reducer';
import { SnackbarEffects } from './Ngrx/snackbar/snackbar.effects';
import {
  ScheduleModule,
  RecurrenceEditorModule,
} from '@syncfusion/ej2-angular-schedule';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    ScheduleModule,
    RecurrenceEditorModule,
    StoreModule.forRoot({
      auth: authReducer,
      patients: patientReducer,
      doctors: doctorReducer,
      staff: staffReducer,
      snackbar: snackbarReducer,
    }),
    EffectsModule.forRoot([
      DoctorEffects,
      StaffEffects,
      PatientEffects,
      SnackbarEffects,
    ]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
