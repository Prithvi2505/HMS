import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedRoomComponent } from './assigned-room.component';

describe('AssignedRoomComponent', () => {
  let component: AssignedRoomComponent;
  let fixture: ComponentFixture<AssignedRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignedRoomComponent]
    });
    fixture = TestBed.createComponent(AssignedRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
