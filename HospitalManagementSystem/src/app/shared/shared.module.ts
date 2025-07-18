import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';

import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ListComponent } from './list/list.component';
import { BannerComponent } from './banner/banner.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialTableComponent } from './material-table/material-table.component';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


import { ShowDetailComponent } from './show-detail/show-detail.component';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { BillFormDialogComponent } from './bill-form-dialog/bill-form-dialog.component';
import { RoomFormDialogComponent } from './room-form-dialog/room-form-dialog.component';
import { AssignStaffRoomDialogComponent } from './assign-staff-room-dialog/assign-staff-room-dialog.component';
import { RoomTableComponent } from './room-table/room-table.component';
import { BillTableComponent } from './bill-table/bill-table.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SpinnerComponent } from './spinner/spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ListComponent,
    BannerComponent,
    MaterialTableComponent,
    ShowDetailComponent,
    SearchBarComponent,
    DynamicFormComponent,
    BillFormDialogComponent,
    RoomFormDialogComponent,
    AssignStaffRoomDialogComponent,
    RoomTableComponent,
    BillTableComponent,
    EditUserComponent,
    LoginComponent,
    RegisterComponent,
    SpinnerComponent,

  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    RouterModule,
    FormsModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    ListComponent,
    BannerComponent,
    ReactiveFormsModule,
    MaterialTableComponent,
    MatNativeDateModule,
    ShowDetailComponent,
    SearchBarComponent,
    FormsModule,
    DynamicFormComponent,
    BillFormDialogComponent,
    RoomFormDialogComponent,
    AssignStaffRoomDialogComponent,
    RoomTableComponent,
    BillTableComponent,
    EditUserComponent,
    LoginComponent,
    RegisterComponent,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    SpinnerComponent,
  ]
})
export class SharedModule { }
