import { Component, Input } from '@angular/core';
import { List } from 'src/app/type/list';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  constructor(private router:Router){}
  @Input() showList: List | null = null;
  @Input() action!: () => void;

  onButtonClick() {
    if (this.action) {
      this.action();
    }
  }
  navToMed(){
    this.router.navigate(['/patient/medicalRecord']);
  }
}
