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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forRoot({auth: authReducer}, {}),
    EffectsModule.forRoot([]),
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
