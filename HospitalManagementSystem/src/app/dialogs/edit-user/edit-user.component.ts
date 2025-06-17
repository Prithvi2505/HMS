// edit-user.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { deleteDoctor, updateDoctor } from 'src/app/Store/doctor/doctor.action';
import { deletePatient, updatePatient } from 'src/app/Store/patient/patient.action';
import { deleteStaff, updateStaff } from 'src/app/Store/staff/staff.action';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editForm!: FormGroup;
  genders: string[] = ['Male', 'Female', 'Other'];
  staffTypes: string[] = ['Receptionist', 'Nurse', 'Technician'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    const baseControls = {
      name: [this.data.name, Validators.required],
      gender: [this.data.gender, Validators.required],
    };

    let roleControls: any = {};

    switch (this.data.role) {
      case 'patient':
        roleControls = {
          age: [this.data.age, [Validators.required, Validators.min(0)]],
          city: [this.data.city, Validators.required],
          mobileNo: [this.data.mobileNo, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
        };
        break;
      case 'doctor':
        roleControls = {
          specialization: [this.data.specialization, Validators.required],
          yearOfExperience: [this.data.yearOfExperience, [Validators.required, Validators.min(0)]]
        };
        break;
      case 'staff':
        roleControls = {
          type: [this.data.type, Validators.required]
        };
        break;
    }

    this.editForm = this.fb.group({
      ...baseControls,
      ...roleControls
    });
  }

  onUpdate(): void {
    const updatedData = this.editForm.value;
    const id = this.data.id;

    if (this.data.role === 'patient') {
      this.store.dispatch(updatePatient({ id, patient: updatedData }));
    } else if (this.data.role === 'doctor') {
      this.store.dispatch(updateDoctor({ id, doctor: updatedData }));
    } else if (this.data.role === 'staff') {
      this.store.dispatch(updateStaff({ id, staff: updatedData }));
    }

    this.dialogRef.close(true);
  }

  onDelete(): void {
    const id = this.data.id;

    if (this.data.role === 'patient') {
      this.store.dispatch(deletePatient({ id }));
    } else if (this.data.role === 'doctor') {
      this.store.dispatch(deleteDoctor({ id }));
    } else if (this.data.role === 'staff') {
      this.store.dispatch(deleteStaff({ id }));
    }

    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close({ action: 'cancel' });
  }
}
