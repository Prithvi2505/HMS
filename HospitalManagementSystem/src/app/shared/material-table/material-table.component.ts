import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.css']
})
export class MaterialTableComponent implements OnInit, OnChanges {
  @Input() dataSource: any[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() columnHeaders: { [key: string]: string } = {};
  @Input() user: { userid: number; role: string } = { userid: 0, role: '' };
  @Input() moduleType: string = '';


  @Output() update = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pagedDataSource = new MatTableDataSource<any>();
  pageSize = 5;
  currentPage = 0;

  ngOnInit(): void {
    this.updatePagedData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource']) {
      this.updatePagedData();
    }
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePagedData();
  }

  updatePagedData(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.pagedDataSource.data = this.dataSource.slice(start, end);
  }

  canEdit(element: any): boolean {
  const role = this.user.role?.toLowerCase();
  const userId = this.user.userid;
  switch (this.moduleType) {
    case 'appointment':
      return (role == 'patient' && element.patientId?.toString() == userId) ||
             (role == 'doctor' && element.doctorId?.toString() == userId);

    case 'bill':
      return role == 'doctor'; // Any doctor can edit

    case 'medicalRecord':
      return role == 'doctor' || (role == 'patient' && element.patientId?.toString() == userId);

    case 'assignedRoom':
      return role == 'doctor'; // Only doctors can update/delete

    case 'room':
      return role == 'doctor';

    default:
      return false;
  }
}
}
