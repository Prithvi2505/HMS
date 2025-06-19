import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomComponent } from './add-room.component';
import { Store } from '@ngrx/store';
import { showSuccess, showError } from 'src/app/store/snackbar/snackbar.actions';

describe('AddRoomComponent', () => {
  let component: AddRoomComponent;
  let fixture: ComponentFixture<AddRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRoomComponent]
    });
    fixture = TestBed.createComponent(AddRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
