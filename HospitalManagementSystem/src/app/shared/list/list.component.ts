import { Component, Input } from '@angular/core';
import { List } from 'src/app/type/list';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  @Input() showList: List | null = null;
}
