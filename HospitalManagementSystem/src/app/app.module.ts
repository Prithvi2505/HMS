import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './Store/auth.reducer';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { doctorReducer } from './Store/doctor/doctor.reducer';
import { patientReducer } from './Store/patient/patient.reducer';
import { staffReducer } from './Store/staff/staff.reducer';
import { PatientEffects } from './Store/patient/patient.effects';
import { StaffEffects } from './Store/staff/staff.effects';
import { DoctorEffects } from './Store/doctor/doctor.effects';
import { snackbarReducer } from './Store/snackbar/snackbar.reducer';
import { SnackbarEffects } from './Store/snackbar/snackbar.effects';




@NgModule({
  declarations: [
    AppComponent,
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
