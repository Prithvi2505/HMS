import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BillService } from 'src/app/services/bill.service';
import { TokenService } from 'src/app/services/token.service';
import { Store } from '@ngrx/store';
import { showSuccess, showError } from 'src/app/Ngrx/snackbar/snackbar.actions';
import { BillFormDialogComponent } from '../bill-form-dialog/bill-form-dialog.component';

@Component({
  selector: 'app-bill-table',
  templateUrl: './bill-table.component.html',
  styleUrls: ['./bill-table.component.css']
})
export class BillTableComponent implements OnInit {
  dataSource: any[] = [];
  displayedColumns: string[] = [];
  columnHeaders: { [key: string]: string } = {};
  user = { userid: 0, role: '' };

  constructor(private dialog: MatDialog, 
    private route:ActivatedRoute,
    private billService: BillService,
    private tokenService:TokenService,
    private store:Store
  ) { };

  ngOnInit() {
    const urlId = this.route.snapshot.paramMap.get('id');
    this.user.role = this.tokenService.getUserRole()!;
    this.user.userid = this.tokenService.getUserId()!;
    const { userid, role } = this.user;

    const baseColumns = ['id', 'amount', 'date', 'billDetail','status' ,'patientId'];
    const actionColumns = ['action', 'remove'];

    this.displayedColumns = baseColumns;
    if (this.user.role == 'doctor') {
      this.displayedColumns = [...baseColumns, ...actionColumns];
    }
    this.columnHeaders = {
      id: 'ID', amount: 'Amount',status:'Bill Status',date: 'Date',
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
    const dialogRef = this.dialog.open(BillFormDialogComponent, {
      width: '500px',
      data: { mode: 'add' }
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
  onUpdate(item: any) { 
    const dialogRef = this.dialog.open(BillFormDialogComponent, {
      width: '400px',
      data: {
      mode: 'edit',
      initialValues: item,
    }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.route.paramMap.subscribe(params => {
      const patientId = params.get('id');
      if (this.user.role === 'patient' && patientId) {
        this.loadPatientBills(+patientId);
      } else {
        this.loadAllBills();
      }
    });
      }
    })
   }
  onDelete(item: any) { const confirmed = confirm(`Are you sure you want to delete bill ID ${item.id}?`);
  if (!confirmed) return;

  this.billService.deleteBill(item.id).subscribe({
    next: () => {
      this.store.dispatch(showSuccess({ message: 'Bill deleted successfully!' }));
      const patientId = this.route.snapshot.paramMap.get('id');
      if (this.user.role === 'patient' && patientId) {
        this.loadPatientBills(+patientId);
      } else {
        this.loadAllBills();
      }
    },
    error: (err) => {
      console.error('Failed to delete bill:', err);
      this.store.dispatch(showError({ message: err.error?.message || 'Failed to delete bill.' }));
    }
  }); }
}
