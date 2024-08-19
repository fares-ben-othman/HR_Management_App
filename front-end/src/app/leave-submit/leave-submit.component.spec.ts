import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveSubmitComponent } from './leave-submit.component';

describe('LeaveSubmitComponent', () => {
  let component: LeaveSubmitComponent;
  let fixture: ComponentFixture<LeaveSubmitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaveSubmitComponent]
    });
    fixture = TestBed.createComponent(LeaveSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
