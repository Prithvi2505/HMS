
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

import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { ShowDetailComponent } from './show-detail/show-detail.component';





@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ListComponent,
    BannerComponent,
    MaterialTableComponent,
    ShowDetailComponent,
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
    NgxMaterialTimepickerModule,
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
    NgxMaterialTimepickerModule,
    ShowDetailComponent
  ]
})
export class SharedModule { }
