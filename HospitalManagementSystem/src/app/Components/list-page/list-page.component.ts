import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ShowDetailComponent } from '../show-detail/show-detail.component';
import { List } from 'src/app/Model/list';
import { Patient } from 'src/app/Model/patient';
import { Doctor } from 'src/app/Model/doctor';
import { Staff } from 'src/app/Model/staff';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit{
 entityList: (Patient | Doctor | Staff)[] = []; 
 role:string = "";

  constructor(private route: ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit() {
    const entityType = this.route.snapshot.paramMap.get('type');
    if (entityType === 'patient') {
      const data = localStorage.getItem('patients');
      const parsedData = data ? JSON.parse(data) : [];
      this.role = 'patient';
      this.entityList = parsedData.map((item: any) => item.details);
    } else if (entityType === 'doctor') {
      const data = localStorage.getItem('doctors');
      const parsedData = data ? JSON.parse(data) : [];
      this.role = 'doctor';
      this.entityList = parsedData.map((item: any) => item.details);
    } else if (entityType === 'staff') {
      const data = localStorage.getItem('staff');
      const parsedData = data ? JSON.parse(data) : [];
      this.role = 'staff';
      this.entityList = parsedData.map((item: any) => item.details);
    }
  }

   showDetails(item: Patient|Doctor|Staff) {
    const dialogRef = this.dialog.open(ShowDetailComponent, {
      width: '400px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
    });
  }
}

