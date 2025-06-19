import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Bill } from 'src/app/Model/bill';
import { BillService } from 'src/app/services/bill.service';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.css']
})
export class AddBillComponent {
  status: string[] = ['Paid', 'Unpaid'];
  bills: Bill[] = [];
  constructor(private router: Router, private dialogRef: MatDialogRef<AddBillComponent>, private billService: BillService) {
    const storedBills = localStorage.getItem('bills');
    this.bills = storedBills ? JSON.parse(storedBills) : [];
  }
  addBillForm = new FormGroup({
    patientId: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    status:new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    billDetail: new FormControl('', Validators.required)
  })

  OnCancel() {
    this.dialogRef.close();
  }
  addBill() {
    if (this.addBillForm.invalid) return;

    const rawDate = this.addBillForm.value.date;
    const formattedDate = rawDate ? new Date(rawDate).toISOString().split('T')[0] : '';

    const formData = {
      amount: Number(this.addBillForm.value.amount),
      status:this.addBillForm.value.status ?? '',
      date: formattedDate,
      billDetail: this.addBillForm.value.billDetail ?? '',
      patientId: Number(this.addBillForm.value.patientId)
    };

    this.billService.createBill(formData).subscribe({
      next: (response) => {
        console.log('Bill created:', response);
        alert('Bill successfully created!');
        this.dialogRef.close(true); 
      },
      error: (error) => {
        console.error('Error creating bill:', error);
        alert('Failed to create bill. Please try again.');
      }
    });
  }
}
