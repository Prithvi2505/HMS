import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Doctor } from 'src/app/Model/doctor';
import { Patient } from 'src/app/Model/patient';
import { Staff } from 'src/app/Model/staff';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.css']
})
export class ShowDetailComponent {
   constructor(
    public dialogRef: MatDialogRef<ShowDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Patient | Doctor | Staff ,
  ) {}

  isPatient(item: Patient | Doctor | Staff): item is Patient {
    return (item as Patient).age !== undefined;
  }

  isDoctor(item: Patient | Doctor | Staff): item is Doctor {
    return (item as Doctor).specialization !== undefined;
  }

  isStaff(item: Patient | Doctor | Staff): item is Staff {
    return (item as Staff).type !== undefined;
  }
  onClose(): void {
    this.dialogRef.close();
  }
}
