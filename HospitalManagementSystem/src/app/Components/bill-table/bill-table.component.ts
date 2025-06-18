import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AddBillComponent } from 'src/app/dialogs/add-bill/add-bill.component';
import { Bill } from 'src/app/Model/bill';
import { BillService } from 'src/app/services/bill.service';

@Component({
  selector: 'app-bill-table',
  templateUrl: './bill-table.component.html',
  styleUrls: ['./bill-table.component.css']
})
export class BillTableComponent {
  bills : Bill[]= [];
  dataSource: any[] = [];
  displayedColumns: string[] = [];
  columnHeaders: { [key: string]: string } = {};
  user = { userid: '', role: '' };

  constructor(private dialog: MatDialog, private route:ActivatedRoute,private billService: BillService) { };

  ngOnInit() {
    const urlId = this.route.snapshot.paramMap.get('id');
    const userStr = localStorage.getItem('auth');
    if (userStr) {
      this.user = JSON.parse(userStr);
    }
    const { userid, role } = this.user;
    const all: any = localStorage.getItem('bills')


    this.dataSource = all ? JSON.parse(all) : [];
    const baseColumns = ['id', 'amount', 'date', 'billDetail', 'patientId'];
    const actionColumns = ['action', 'remove'];

    this.displayedColumns = baseColumns;
    if (this.user.role == 'doctor') {
      this.displayedColumns = [...baseColumns, ...actionColumns];
    }
    this.columnHeaders = {
      id: 'ID', amount: 'Amount', date: 'Date',
      billDetail: 'Bill Detail', patientId: 'Patient ID',
      action: 'Action', remove: 'Remove'
    };
    this.route.paramMap.subscribe(params => {
      const patientId = params.get('id');
      if (this.user.role === 'patient' && patientId) {
        this.loadPatientBills(+patientId);
      } else {
        this.loadAllBills();
      }
    });
  }

  addBill() {
    const dialogRef = this.dialog.open(AddBillComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      this.route.paramMap.subscribe(params => {
      const patientId = params.get('id');
      if (this.user.role === 'patient' && patientId) {
        this.loadPatientBills(+patientId);
      } else {
        this.loadAllBills();
      }
    });
  }
    });
  }
 loadAllBills() {
    this.billService.getAllBills().subscribe({
      next: (bills) => this.dataSource = bills,
      error: (err) => console.error('Failed to fetch all bills:', err)
    });
  }

  loadPatientBills(patientId: number) {
    this.billService.getBillsByPatientId(patientId).subscribe({
      next: (bills) => this.dataSource = bills,
      error: (err) => console.error('Failed to fetch patient bills:', err)
    });
  }
  onUpdate(item: any) { console.log('Update', item); }
  onDelete(item: any) { console.log('Delete', item); }
}
