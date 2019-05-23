import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchComponent } from './branch.component';
import { FormControl, Validators } from '@angular/forms';

declare var $:any;

describe('BranchComponent', () => {
  let component: BranchComponent;
  let fixture: ComponentFixture<BranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
