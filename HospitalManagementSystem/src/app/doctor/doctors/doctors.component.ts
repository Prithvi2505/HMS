import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Doctor } from 'src/app/Model/doctor';
import { Patient } from 'src/app/Model/patient';
import { Staff } from 'src/app/Model/staff';
import { ShowDetailComponent } from 'src/app/shared/show-detail/show-detail.component';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {
    entityList:Doctor[] =[];
    role:string="";
    constructor(private dialog:MatDialog){}
    ngOnInit(): void {
       const data = localStorage.getItem('doctors');
       const parsedData = data ? JSON.parse(data) : [];
        this.role = 'doctor';
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
