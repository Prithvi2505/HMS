import { Component, Input } from '@angular/core';
import { List } from 'src/app/type/list';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
@Input() Lists : List[] = [];
@Input() detailfunc!: () => void;
}
