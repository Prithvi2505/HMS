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
 entityList: (Patient | Doctor | Staff)[] = []; // Update type to Patient | Doctor | Staff

  // dummyPatients: Patient[] = [
  //   {
  //     id: "123abc",
  //     email: "patient1@gmail.com",
  //     name: "abcdefgh",
  //     gender: "male",
  //     age: 30,
  //     address: "123 Main St",
  //     mobile_no: 1234567890
  //   },
  //   {
  //     id: "123abd",
  //     email: "patient2@gmail.com",
  //     name: "Prithvi",
  //     gender: "male",
  //     age: 25,
  //     address: "456 Oak Ave",
  //     mobile_no: 2345678901
  //   },
  //   {
  //     id: "123abe",
  //     email: "patient3@gmail.com",
  //     name: "Gohil",
  //     gender: "male",
  //     age: 40,
  //     address: "789 Pine Rd",
  //     mobile_no: 3456789012
  //   },
  //   {
  //     id: "123abf",
  //     email: "patient4@gmail.com",
  //     name: "xyzabc",
  //     gender: "female",
  //     age: 28,
  //     address: "101 Elm St",
  //     mobile_no: 4567890123
  //   }
  // ];

  // dummyDoctors: Doctor[] = [
  //   {
  //     id: "123abc",
  //     email: "doctor1@gmail.com",
  //     name: "abcdefgh",
  //     gender: "male",
  //     specialization: "Cardiology",
  //     years_of_experience: 10
  //   },
  //   {
  //     id: "123abd",
  //     email: "doctor2@gmail.com",
  //     name: "Prithvi",
  //     gender: "male",
  //     specialization: "Neurology",
  //     years_of_experience: 8
  //   },
  //   {
  //     id: "123abe",
  //     email: "doctor3@gmail.com",
  //     name: "Gohil",
  //     gender: "male",
  //     specialization: "Pediatrics",
  //     years_of_experience: 15
  //   },
  //   {
  //     id: "123abf",
  //     email: "doctor4@gmail.com",
  //     name: "xyzabc",
  //     gender: "female",
  //     specialization: "Orthopedics",
  //     years_of_experience: 12
  //   }
  // ];

  // dummyStaff: Staff[] = [
  //   {
  //     id: "123abc",
  //     email: "staff2@gmail.com",
  //     name: "abcdefgh",
  //     gender: "male",
  //     type: "Nursing",
  //   },
  //   {
  //     id: "123abd",
  //     email: "staff3@gmail.com",
  //     name: "Prithvi",
  //     gender: "male",
  //     type: "Administration",
  //   },
  //   {
  //     id: "123abe",
  //     email: "staff4@gmail.com",
  //     name: "Gohil",
  //     gender: "male",
  //     type: "Maintenance",
  //   },
  //   {
  //     id: "123abf",
  //     email: "staff1@gmail.com",
  //     name: "xyzabc",
  //     gender: "female",
  //     type: "Pharmacy",
  //   }
  // ];

  constructor(private route: ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit() {
    const entityType = this.route.snapshot.paramMap.get('type');
    // Example dynamic data fetching based on entity
    if (entityType === 'patient') {
      const data = localStorage.getItem('patients');
      const parsedData = data ? JSON.parse(data) : [];
      this.entityList = parsedData.map((item: any) => item.details);
    } else if (entityType === 'doctor') {
      const data = localStorage.getItem('doctors');
      const parsedData = data ? JSON.parse(data) : [];
      this.entityList = parsedData.map((item: any) => item.details);
    } else if (entityType === 'staff') {
      const data = localStorage.getItem('staff');
      const parsedData = data ? JSON.parse(data) : [];
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

