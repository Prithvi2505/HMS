import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddBillComponent } from 'src/app/dialogs/add-bill/add-bill.component';

@Component({
  selector: 'app-bill-table',
  templateUrl: './bill-table.component.html',
  styleUrls: ['./bill-table.component.css']
})
export class BillTableComponent {
   dataSource: any[] = [];
    displayedColumns: string[] = [];
    columnHeaders: { [key: string]: string } = {};
    user = { userid: '', role: '' };
  
    constructor(private dialog:MatDialog){}
  
    ngOnInit(){
      const userStr = localStorage.getItem('auth');
      if (userStr) {
        this.user = JSON.parse(userStr);
      }
      const { userid, role } = this.user;
      const all:any = localStorage.getItem('bills')

        
        this.dataSource = all ? JSON.parse(all) : [];
        this.displayedColumns = ['id', 'amount', 'date', 'billDetail', 'patientId', 'action', 'remove'];
        this.columnHeaders = {
        id: 'ID', amount: 'Amount', date: 'Date',
        billDetail: 'Bill Detail', patientId: 'Patient ID',
        action: 'Action', remove: 'Remove'
      };
    }
    
    addBill() {
    const dialogRef = this.dialog.open(AddBillComponent, {
      width: '500px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
      const all = localStorage.getItem('bills');
      this.dataSource = all ? JSON.parse(all) : [];
    });
  }
    onUpdate(item: any) { console.log('Update', item); }
    onDelete(item: any) { console.log('Delete', item); }
}
