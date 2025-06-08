import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent {
dataSource:any;
  @ViewChild(MatPaginator) paginator !:MatPaginator

  displayedColumns: string[] = ['id', 'name', 'genre', 'releaseDate','duration', 'action','remove'];
}

