// edit-user.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TokenService } from 'src/app/services/token.service';
import { logout } from 'src/app/Store/auth.action';
import { deleteDoctor, updateDoctor } from 'src/app/Store/doctor/doctor.action';
import { deletePatient, updatePatient } from 'src/app/Store/patient/patient.action';
import { deleteStaff, updateStaff } from 'src/app/Store/staff/staff.action';
import { showSuccess, showError } from 'src/app/Store/snackbar/snackbar.actions';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editForm!: FormGroup;
  daysOfWeek = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  genders: string[] = ['Male', 'Female', 'Other'];
  staffTypes: string[] = ['Receptionist', 'Nurse', 'Technician'];
  loggedInUserRole: string = "";

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store,
    private tokenService: TokenService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.loggedInUserRole = this.tokenService.getUserRole()!;
  }
  startTimeBeforeEndTimeValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const start = group.get('startTime')?.value;
    const end = group.get('endTime')?.value;
    if (!start || !end) return null;

    const startTime = new Date(`2000-01-01T${start}`);
    const endTime = new Date(`2000-01-01T${end}`);
    return startTime >= endTime ? { startAfterEnd: true } : null;
  };
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
          yearOfExperience: [this.data.yearOfExperience, [Validators.required, Validators.min(0)]],
          maxAppointmentsPerDay: [this.data.maxAppointmentsPerDay, [Validators.required, Validators.min(0)]],
          startTime: [this.data.startTime, Validators.required],
          endTime: [this.data.endTime, Validators.required],
          availableDays: [this.data.availableDays || [], Validators.required],
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
    },{ validators: this.data.role === 'doctor' ? this.startTimeBeforeEndTimeValidator() : null });
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
    const role = this.data.role.toUpperCase();
    const confirmDelete = confirm(`Are you sure you want to delete ${role} ID ${id}?`);
    if (!confirmDelete) return;


    if (this.data.role === 'patient') {
      this.store.dispatch(deletePatient({ id }));
      if (this.loggedInUserRole === 'patient') {
        this.Logout();
      }
    } else if (this.data.role === 'doctor') {
      this.store.dispatch(deleteDoctor({ id }));
      if (this.loggedInUserRole === 'doctor') {
        this.Logout();
      }
    } else if (this.data.role === 'staff') {
      this.store.dispatch(deleteStaff({ id }));
      if (this.loggedInUserRole === 'staff') {
        this.Logout();
      }
    }

    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close({ action: 'cancel' });
  }

  Logout() {
    this.store.dispatch(logout());
    localStorage.removeItem('auth')
    this.route.navigate(['login']);
  }

}
