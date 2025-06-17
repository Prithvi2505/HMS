import { Component, Input } from '@angular/core';
import { Doctor } from 'src/app/Model/doctor';
import { List } from 'src/app/Model/list';
import { Patient } from 'src/app/Model/patient';
import { Staff } from 'src/app/Model/staff';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
@Input() Lists : List[] = [];
@Input() detailfunc!: (item: Patient|Doctor|Staff) => void;
@Input() assignbuttonRole!:string;
@Input() assignRole!: string;
@Input() loggedInUserId: number | null = null;
@Input() listType!: 'patient' | 'doctor' | 'staff';

}
