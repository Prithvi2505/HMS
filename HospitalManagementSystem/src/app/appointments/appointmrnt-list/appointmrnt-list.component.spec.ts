import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmrntListComponent } from './appointmrnt-list.component';

describe('AppointmrntListComponent', () => {
  let component: AppointmrntListComponent;
  let fixture: ComponentFixture<AppointmrntListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmrntListComponent]
    });
    fixture = TestBed.createComponent(AppointmrntListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
