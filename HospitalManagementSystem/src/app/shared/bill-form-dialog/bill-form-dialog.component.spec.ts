import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillFormDialogComponent } from './bill-form-dialog.component';

describe('BillFormDialogComponent', () => {
  let component: BillFormDialogComponent;
  let fixture: ComponentFixture<BillFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillFormDialogComponent]
    });
    fixture = TestBed.createComponent(BillFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
