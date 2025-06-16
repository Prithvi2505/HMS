import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Doctor } from 'src/app/Model/doctor';
import { Patient } from 'src/app/Model/patient';
import { Staff } from 'src/app/Model/staff';
import { ShowDetailComponent } from 'src/app/shared/show-detail/show-detail.component';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit{
  entityList:Patient[] =[];
  role:string="";
  constructor(private dialog:MatDialog){}
  ngOnInit(): void {
     const data = localStorage.getItem('patients');
     const parsedData = data ? JSON.parse(data) : [];
      this.role = 'patient';
      this.entityList = parsedData.map((item: any) => item.details)   
  }
   showDetails(item:Patient|Doctor|Staff) {
      const dialogRef = this.dialog.open(ShowDetailComponent, {
        width: '400px',
        data: item
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('Dialog closed');
      });
    }
 
}
