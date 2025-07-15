import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomFormDialogComponent } from './room-form-dialog.component';

describe('RoomFormDialogComponent', () => {
  let component: RoomFormDialogComponent;
  let fixture: ComponentFixture<RoomFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomFormDialogComponent]
    });
    fixture = TestBed.createComponent(RoomFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
