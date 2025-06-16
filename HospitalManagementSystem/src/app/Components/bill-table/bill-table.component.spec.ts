import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillTableComponent } from './bill-table.component';

describe('BillTableComponent', () => {
  let component: BillTableComponent;
  let fixture: ComponentFixture<BillTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillTableComponent]
    });
    fixture = TestBed.createComponent(BillTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
