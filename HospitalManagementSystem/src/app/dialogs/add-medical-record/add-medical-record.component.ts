import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-medical-record',
  templateUrl: './add-medical-record.component.html',
  styleUrls: ['./add-medical-record.component.css']
})
export class AddMedicalRecordComponent {
  medicalRecords:any[] =[];
  constructor(private router:Router,private dialogRef: MatDialogRef<AddMedicalRecordComponent>){
     const storedMedicalRecords = localStorage.getItem('medicalRecords');
      this.medicalRecords = storedMedicalRecords ? JSON.parse(storedMedicalRecords) : [];
  }
        addMedicalRecordForm = new FormGroup({
            patientId: new FormControl('', Validators.required),
            diagnosis:new FormControl('',Validators.required),
            yearOfDiagnosis: new FormControl('',Validators.required),
            medicineUsed: new FormControl('', Validators.required)
          })
    
        OnCancel(){
          this.dialogRef.close();
        }
        addMedicalRecord(){
           if(this.addMedicalRecordForm.invalid) return; 
      const formData = this.addMedicalRecordForm.value;
      this.medicalRecords.push(formData)
      localStorage.setItem('medicalRecords', JSON.stringify(this.medicalRecords));
      this.dialogRef.close();
        }
}
