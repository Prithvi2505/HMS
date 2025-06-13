import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.css']
})
export class MaterialTableComponent {
   @Input() dataSource: any[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() columnHeaders: { [key: string]: string } = {};

  @Output() update = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();
}
