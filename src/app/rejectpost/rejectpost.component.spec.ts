import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectpostComponent } from './rejectpost.component';

describe('RejectpostComponent', () => {
  let component: RejectpostComponent;
  let fixture: ComponentFixture<RejectpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectpostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
