import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.css']
})
export class AddBillComponent {
  bills:any[] =[];
    constructor(private router:Router,private dialogRef: MatDialogRef<AddBillComponent>){
      const storedBills = localStorage.getItem('bills');
      this.bills = storedBills ? JSON.parse(storedBills) : [];
    }
      addBillForm = new FormGroup({
          patientId: new FormControl('', Validators.required),
          amount:new FormControl('',Validators.required),
          date: new FormControl('',Validators.required),
          billDetail: new FormControl('', Validators.required)
        })
  
      OnCancel(){
        this.dialogRef.close();
      }
      addBill(){
      if(this.addBillForm.invalid) return; 
      const formData = this.addBillForm.value;
      this.bills.push(formData)
      localStorage.setItem('bills', JSON.stringify(this.bills));
      this.dialogRef.close();
      }
}
