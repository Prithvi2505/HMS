import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-medical-records',
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.css']
})
export class MedicalRecordsComponent {
  dataSource:any;
  @ViewChild(MatPaginator) paginator !:MatPaginator

  displayedColumns: string[] = ['id', 'diagnosis', 'year_of_diagnosis', 'medicine_used','patient_id', 'action','remove'];
}
